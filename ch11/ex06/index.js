export const isEmailAddress = (email) => {
    if (typeof email !== 'string')
        return false;
    // forward-pathは < [ A-d-l ":" ] Mailbox > の形式で定義されている
    // つまり、メールアドレス（Mailbox）の前後に少なくとも山括弧（< と >）が必要
    // この2文字分を考慮すると、メールアドレス自体は254文字が上限となる
    // https://zenn.dev/be_the_light/articles/email_validation_rfc
    if (email.length > 254)
        return false; // 全体の長さは254文字以内
    const [local, domain] = email.split('@');
    if (!local || !domain)
        return false;
    if (local.length > 64)
        return false; // ローカル部分64文字以内
    if (domain.length > 255)
        return false; // ドメイン全体255文字以内
    if (local.startsWith('.') ||
        local.endsWith('.') ||
        domain.startsWith('.') ||
        domain.endsWith('.') ||
        email.includes('..'))
        return false; // 先頭、末尾、連続ドット禁止
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(email);
};
// export const isEmailAddress = (email: string) =>
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
//     email
//   );
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxLQUFnQyxFQUFXLEVBQUU7SUFDMUUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFNUMsc0RBQXNEO0lBQ3RELDZDQUE2QztJQUM3QyxxQ0FBcUM7SUFDckMsOERBQThEO0lBQzlELElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHO1FBQUUsT0FBTyxLQUFLLENBQUMsQ0FBQyxnQkFBZ0I7SUFFdEQsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDcEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUU7UUFBRSxPQUFPLEtBQUssQ0FBQyxDQUFDLGVBQWU7SUFDcEQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUc7UUFBRSxPQUFPLEtBQUssQ0FBQyxDQUFDLGdCQUFnQjtJQUN2RCxJQUNFLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDO1FBQ3RCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRXBCLE9BQU8sS0FBSyxDQUFDLENBQUMsZ0JBQWdCO0lBRWhDLE9BQU8scUVBQXFFLENBQUMsSUFBSSxDQUMvRSxLQUFLLENBQ04sQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLG1EQUFtRDtBQUNuRCxpSkFBaUo7QUFDakosWUFBWTtBQUNaLE9BQU8ifQ==