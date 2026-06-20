import api from "@/app/utils/axios";

/** Normalize notification flags from GET /user/settings response.data */
export function parseNotificationsFromSettings(responseData) {
  const source = responseData?.data ?? responseData ?? {};

  return {
    emailNotifications: Boolean(source.emailNotifications ?? true),
    eligibilityAlerts: Boolean(source.eligibilityAlerts ?? true),
    deadlineReminders: Boolean(source.deadlineReminders ?? true),
  };
}

export function notificationPayload(notifications) {
  return {
    emailNotifications: Boolean(notifications.emailNotifications),
    eligibilityAlerts: Boolean(notifications.eligibilityAlerts),
    deadlineReminders: Boolean(notifications.deadlineReminders),
  };
}

export async function fetchNotificationSettings() {
  const res = await api.get("/user/settings");
  return parseNotificationsFromSettings(res.data);
}

export async function updateNotificationSettings(notifications) {
  const res = await api.put(
    "/user/settings/notifications",
    notificationPayload(notifications),
  );
  return res?.data;
}
