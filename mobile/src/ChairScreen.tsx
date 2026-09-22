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
import {
  chairLogin,
  chairLogout,
  fetchDesk,
  getToken,
  patchDesk,
  postDesk,
} from "./api";
import { colors } from "./theme";
import type { Booking, DeskPayload } from "./types";

const QUICK = [
  { id: "hair-cut", label: "Cut" },
  { id: "skin-fade-with-zero-clipper-fade", label: "Fade" },
  { id: "hair-cut-and-wash", label: "Wash" },
  { id: "turkish-wet-shave", label: "Shave" },
  { id: "kids-haircut", label: "Kids" },
  { id: "phoenix-special-hair-cut", label: "Special" },
] as const;

function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year ?? 2026, (month ?? 1) - 1, day ?? 1));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

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

function pence(price: string) {
  const match = /£\s*(\d+(?:\.\d+)?)/.exec(price);
  return match ? Math.round(Number(match[1]) * 100) : 0;
}

function pounds(value: number) {
  const n = value / 100;
  return Number.isInteger(n) ? `£${n}` : `£${n.toFixed(2)}`;
}

export function ChairScreen() {
  const [password, setPassword] = useState("");
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [data, setData] = useState<DeskPayload | null>(null);
  const [date, setDate] = useState("");
  const [walkIn, setWalkIn] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function load() {
    const desk = await fetchDesk();
    if (!desk) {
      setSignedIn(false);
      setData(null);
      return;
    }
    setData(desk);
    setSignedIn(true);
    setDate((current) => current || desk.today);
  }

  useEffect(() => {
    getToken()
      .then(async (token) => {
        if (!token) {
          setSignedIn(false);
          return;
        }
        await load();
      })
      .catch(() => setSignedIn(false));
  }, []);

  const dayClosed = Boolean(data?.closedDates.includes(date));
  const dayBookings = useMemo(
    () =>
      (data?.bookings ?? [])
        .filter((booking) => booking.date === date && booking.status !== "cancelled")
        .sort((a, b) => a.start.localeCompare(b.start)),
    [data, date],
  );
  const dayMoney = dayBookings.reduce((sum, booking) => {
    if (booking.status === "blocked") return sum;
    const service = data?.services.find((item) => item.id === booking.serviceId);
    return sum + pence(service?.price ?? "");
  }, 0);

  const historyDays = useMemo(() => {
    if (!data) return [];
    return Array.from({ length: 35 }, (_, index) => addDays(data.today, index - 14));
  }, [data]);

  async function onLogin() {
    setBusy(true);
    setError("");
    try {
      await chairLogin(password);
      setPassword("");
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  async function addWalkIn(serviceId: string) {
    setBusy(true);
    setError("");
    try {
      await postDesk({
        type: "quick",
        date,
        serviceId,
        name: walkIn || "Walk-in",
      });
      setWalkIn("");
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function holdBusy(minutes: number) {
    setBusy(true);
    setError("");
    try {
      await postDesk({
        type: "block",
        date,
        minutes,
        notes: "Busy",
      });
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleDay() {
    setBusy(true);
    setError("");
    try {
      await postDesk({ type: dayClosed ? "open" : "close", date });
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function update(booking: Booking, status: "done" | "deleted") {
    setBusy(true);
    setError("");
    try {
      await patchDesk(booking.id, status);
      await load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  }

  if (signedIn === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.gold} />
      </View>
    );
  }

  if (!signedIn) {
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
            <Text style={styles.kicker}>Chair diary</Text>
            <Text style={styles.title}>Yusuf’s book</Text>
            <Text style={styles.lead}>
              Names, numbers and takings stay here. Clients only see free or busy.
            </Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor={colors.muted}
              secureTextEntry
              style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable
              onPress={onLogin}
              disabled={busy}
              style={[styles.button, busy && { opacity: 0.6 }]}
            >
              <Text style={styles.buttonText}>
                {busy ? "Checking…" : "Open the book"}
              </Text>
            </Pressable>
          </ScrollView>
      </KeyboardAvoidingView>
    );
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
          <Text style={styles.kicker}>Chair diary</Text>
          <Text style={styles.title}>The book</Text>
          <Text style={styles.lead}>
            {formatDay(date || data?.today || "")} · {pounds(dayMoney)} this day
            {dayClosed ? " · closed" : ""}
          </Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.row}
          >
            {historyDays.map((value) => {
              const closed = data?.closedDates.includes(value);
              return (
                <Pressable
                  key={value}
                  onPress={() => setDate(value)}
                  style={[
                    styles.chip,
                    date === value && styles.chipOn,
                    closed && date !== value && styles.chipClosed,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      date === value && styles.chipTextOn,
                    ]}
                  >
                    {formatDay(value)}
                    {closed ? " · closed" : ""}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <Pressable
            onPress={toggleDay}
            disabled={busy}
            style={styles.dayToggle}
          >
            <Text style={styles.dayToggleText}>
              {dayClosed ? "Reopen this day" : "Close this day"}
            </Text>
          </Pressable>

          <TextInput
            value={walkIn}
            onChangeText={setWalkIn}
            placeholder="Walk-in name (optional)"
            placeholderTextColor={colors.muted}
            style={styles.input}
          />
          <View style={styles.quick}>
            {QUICK.map((action) => (
              <Pressable
                key={action.id}
                disabled={busy}
                onPress={() => addWalkIn(action.id)}
                style={styles.quickBtn}
              >
                <Text style={styles.quickText}>{action.label}</Text>
              </Pressable>
            ))}
            <Pressable
              disabled={busy}
              onPress={() => holdBusy(30)}
              style={styles.quickBtn}
            >
              <Text style={styles.quickText}>Busy 30</Text>
            </Pressable>
            <Pressable
              disabled={busy}
              onPress={() => holdBusy(45)}
              style={styles.quickBtn}
            >
              <Text style={styles.quickText}>Busy 45</Text>
            </Pressable>
          </View>

          {dayBookings.length === 0 ? (
            <Text style={styles.lead}>
              {dayClosed
                ? "This day is closed."
                : "Nothing written in for this day."}
            </Text>
          ) : (
            dayBookings.map((booking) => (
              <View key={booking.id} style={styles.card}>
                <Text style={styles.cardTime}>
                  {booking.start}–{booking.end}
                </Text>
                <Text style={styles.cardName}>{booking.customerName}</Text>
                <Text style={styles.cardMeta}>
                  {booking.serviceName}
                  {booking.customerPhone ? ` · ${booking.customerPhone}` : ""}
                  {booking.status === "done" ? " · done" : ""}
                  {booking.status === "blocked" ? " · busy" : ""}
                </Text>
                <View style={styles.actions}>
                  {booking.status === "booked" ? (
                    <Pressable
                      onPress={() => update(booking, "done")}
                      style={styles.small}
                    >
                      <Text style={styles.smallText}>Done</Text>
                    </Pressable>
                  ) : null}
                  <Pressable
                    onPress={() => update(booking, "deleted")}
                    style={styles.smallGhost}
                  >
                    <Text style={styles.smallGhostText}>Remove</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}

          <Pressable
            onPress={async () => {
              await chairLogout();
              setSignedIn(false);
              setData(null);
            }}
            style={styles.signOut}
          >
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.inkDeep },
  page: { flex: 1, backgroundColor: colors.inkDeep },
  content: { padding: 20, paddingBottom: 48 },
  center: {
    flex: 1,
    backgroundColor: colors.inkDeep,
    alignItems: "center",
    justifyContent: "center",
  },
  kicker: {
    color: colors.goldSoft,
    fontWeight: "700",
    letterSpacing: 1.4,
    textTransform: "uppercase",
    fontSize: 12,
  },
  title: { color: colors.cream, fontSize: 40, fontWeight: "700", marginTop: 8 },
  lead: { color: "rgba(246,241,230,0.7)", marginTop: 10, fontSize: 16 },
  error: { color: colors.goldSoft, marginTop: 12, fontWeight: "600" },
  input: {
    marginTop: 16,
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
    marginTop: 20,
    backgroundColor: colors.gold,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: colors.ink, fontWeight: "800", fontSize: 16 },
  row: { flexGrow: 0, marginTop: 16 },
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
  chipClosed: { opacity: 0.55 },
  chipText: { color: colors.cream, fontWeight: "600" },
  chipTextOn: { color: colors.ink },
  dayToggle: { marginTop: 14, alignSelf: "flex-start" },
  dayToggleText: { color: colors.goldSoft, fontWeight: "700" },
  quick: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 14 },
  quickBtn: {
    backgroundColor: "rgba(184,137,45,0.16)",
    borderColor: "rgba(184,137,45,0.4)",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  quickText: { color: colors.goldSoft, fontWeight: "700" },
  card: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 18,
    padding: 14,
  },
  cardTime: { color: colors.goldSoft, fontWeight: "700" },
  cardName: { color: colors.cream, fontSize: 22, fontWeight: "700", marginTop: 4 },
  cardMeta: { color: "rgba(246,241,230,0.65)", marginTop: 4 },
  actions: { flexDirection: "row", gap: 8, marginTop: 12 },
  small: {
    backgroundColor: colors.gold,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallText: { color: colors.ink, fontWeight: "700" },
  smallGhost: {
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  smallGhostText: { color: colors.cream, fontWeight: "700" },
  signOut: { marginTop: 28, alignItems: "center" },
  signOutText: { color: "rgba(246,241,230,0.55)", fontWeight: "600" },
});
