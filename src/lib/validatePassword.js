export function validatePasswordChange({ oldPassword, newPassword, confirmPassword, t }) {
  if (!oldPassword?.trim() || !newPassword?.trim() || !confirmPassword?.trim()) {
    return t("password.required");
  }
  if (newPassword.length < 6) {
    return t("password.min_length");
  }
  if (newPassword !== confirmPassword) {
    return t("password.mismatch");
  }
  if (oldPassword === newPassword) {
    return t("password.same_as_old");
  }
  return null;
}

export function validateResetPassword({ newPassword, confirmPassword, t }) {
  if (!newPassword?.trim() || !confirmPassword?.trim()) {
    return t("password.required");
  }
  if (newPassword.length < 6) {
    return t("password.min_length");
  }
  if (newPassword !== confirmPassword) {
    return t("password.mismatch");
  }
  return null;
}

export function validateEmail(email, t) {
  if (!email?.trim()) {
    return t("password.email_required");
  }
  if (!email.includes("@")) {
    return t("password.email_invalid");
  }
  return null;
}
