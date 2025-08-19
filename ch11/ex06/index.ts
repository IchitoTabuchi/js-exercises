export const isEmailAddress = (email: string | null | undefined): boolean => {
  if (typeof email !== 'string') return false;

  // forward-pathは < [ A-d-l ":" ] Mailbox > の形式で定義されている
  // つまり、メールアドレス（Mailbox）の前後に少なくとも山括弧（< と >）が必要
  // この2文字分を考慮すると、メールアドレス自体は254文字が上限となる
  // https://zenn.dev/be_the_light/articles/email_validation_rfc
  if (email.length > 254) return false; // 全体の長さは254文字以内

  const [local, domain] = email.split('@');
  if (!local || !domain) return false;
  if (local.length > 64) return false; // ローカル部分64文字以内
  if (domain.length > 255) return false; // ドメイン全体255文字以内
  if (
    local.startsWith('.') ||
    local.endsWith('.') ||
    domain.startsWith('.') ||
    domain.endsWith('.') ||
    email.includes('..')
  )
    return false; // 先頭、末尾、連続ドット禁止

  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(
    email
  );
};

// export const isEmailAddress = (email: string) =>
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
//     email
//   );
