import * as Linking from "expo-linking";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { fetchAvailability, holdSlot } from "./api";
import { colors } from "./theme";
import type { ChairService, PublicDay } from "./types";

function formatDay(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function BookScreen() {
  const [services, setServices] = useState<ChairService[]>([]);
  const [serviceId, setServiceId] = useState("hair-cut");
  const [days, setDays] = useState<PublicDay[]>([]);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const service = services.find((item) => item.id === serviceId) ?? services[0];
  const selectedDay = days.find((day) => day.date === date);
  const openDays = useMemo(
    () => days.filter((day) => !day.closed).slice(0, 21),
    [days],
  );
  const visibleSlots = useMemo(
    () => selectedDay?.slots.filter((slot) => slot.kind !== "past") ?? [],
    [selectedDay],
  );

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchAvailability(serviceId)
      .then((data) => {
        if (!alive) return;
        if (data.error) throw new Error(data.error);
        setServices(data.services);
        setDays(data.days);
        const next =
          data.next?.date ??
          data.days.find((day) => !day.closed)?.date ??
          "";
        setDate(next);
        setStart("");
        setError("");
      })
      .catch((err: unknown) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "Could not load times.");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [serviceId]);

  async function onBook() {
    if (!date || !start) {
      setError("Pick a day and a time.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Tell us your name.");
      return;
    }
    if (phone.trim().length < 10) {
      setError("Use a UK mobile so Yusuf can reach you.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const result = await holdSlot({
        serviceId,
        date,
        start,
        name,
        phone,
      });
      setDone(
        `${result.booking?.serviceName} · ${formatDay(result.booking?.date ?? date)} at ${result.booking?.start}`,
      );
      setWhatsapp(result.whatsapp ?? "");
      setStart("");
      const fresh = await fetchAvailability(serviceId);
      setDays(fresh.days);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not book that time.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
          <Text style={styles.kicker}>Book the chair</Text>
          <Text style={styles.title}>Yusuf’s book</Text>
          <Text style={styles.lead}>
            Gold times are free. Taken times stay private. Complimentary Turkish
            tea, and a lollipop for the kids.
          </Text>

          {done ? <Text style={styles.done}>You’re in · {done}</Text> : null}
          {whatsapp ? (
            <Pressable
              onPress={() => Linking.openURL(whatsapp)}
              style={styles.whatsapp}
            >
              <Text style={styles.whatsappText}>Message Yusuf on WhatsApp</Text>
            </Pressable>
          ) : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Text style={styles.label}>Service</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.row}
          >
            {services.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setServiceId(item.id);
                  setDone("");
                  setWhatsapp("");
                }}
                style={[styles.chip, serviceId === item.id && styles.chipOn]}
              >
                <Text
                  style={[
                    styles.chipText,
                    serviceId === item.id && styles.chipTextOn,
                  ]}
                >
                  {item.name} · {item.price}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>Day</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.row}
          >
            {openDays.map((day) => (
              <Pressable
                key={day.date}
                onPress={() => {
                  setDate(day.date);
                  setStart("");
                }}
                style={[styles.chip, date === day.date && styles.chipOn]}
              >
                <Text
                  style={[
                    styles.chipText,
                    date === day.date && styles.chipTextOn,
                  ]}
                >
                  {formatDay(day.date)}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>
            Time{service ? ` · ${service.minutes} min` : ""}
          </Text>
          {loading ? (
            <ActivityIndicator color={colors.gold} style={{ marginVertical: 20 }} />
          ) : visibleSlots.length === 0 ? (
            <Text style={styles.lead}>No times left on this day.</Text>
          ) : (
            <View style={styles.grid}>
              {visibleSlots.map((slot) => {
                const taken = slot.kind === "taken" || !slot.available;
                const selected = slot.start === start;
                return (
                  <Pressable
                    key={slot.start}
                    disabled={taken}
                    onPress={() => setStart(slot.start)}
                    style={[
                      styles.slot,
                      selected && styles.slotOn,
                      taken && styles.slotTaken,
                    ]}
                  >
                    <Text
                      style={[
                        styles.slotText,
                        selected && styles.slotTextOn,
                        taken && styles.slotTextTaken,
                      ]}
                    >
                      {taken ? "Taken" : slot.start}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          <Text style={styles.label}>Your name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="First name"
            placeholderTextColor={colors.muted}
            autoComplete="name"
            style={styles.input}
          />
          <Text style={styles.label}>Mobile</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="07902 000000"
            placeholderTextColor={colors.muted}
            keyboardType="phone-pad"
            autoComplete="tel"
            style={styles.input}
          />

          <Pressable
            onPress={onBook}
            disabled={saving}
            style={[styles.button, saving && { opacity: 0.6 }]}
          >
            <Text style={styles.buttonText}>
              {saving ? "Holding…" : "Hold this time"}
            </Text>
          </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.inkDeep },
  page: { flex: 1, backgroundColor: colors.inkDeep },
  content: { padding: 20, paddingBottom: 48 },
  kicker: {
    color: colors.goldSoft,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontSize: 12,
  },
  title: { color: colors.cream, fontSize: 40, fontWeight: "700", marginTop: 8 },
  lead: {
    color: "rgba(246,241,230,0.7)",
    marginTop: 10,
    fontSize: 16,
    lineHeight: 22,
  },
  done: { color: colors.goldSoft, marginTop: 16, fontWeight: "700" },
  error: { color: colors.goldSoft, marginTop: 12, fontWeight: "600" },
  whatsapp: {
    marginTop: 12,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "rgba(184,137,45,0.45)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  whatsappText: { color: colors.goldSoft, fontWeight: "700" },
  label: { color: "rgba(246,241,230,0.7)", marginTop: 22, marginBottom: 8 },
  row: { flexGrow: 0 },
  chip: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
  },
  chipOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  chipText: { color: colors.cream, fontWeight: "600" },
  chipTextOn: { color: colors.ink },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  slot: {
    width: "31%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(184,137,45,0.35)",
    backgroundColor: "rgba(184,137,45,0.12)",
    paddingVertical: 12,
    alignItems: "center",
  },
  slotOn: { backgroundColor: colors.gold, borderColor: colors.gold },
  slotTaken: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderColor: "rgba(255,255,255,0.06)",
  },
  slotText: { color: colors.cream, fontWeight: "700" },
  slotTextOn: { color: colors.ink },
  slotTextTaken: { color: "rgba(246,241,230,0.3)" },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    color: colors.cream,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    marginTop: 24,
    backgroundColor: colors.gold,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: colors.ink, fontWeight: "800", fontSize: 16 },
});
