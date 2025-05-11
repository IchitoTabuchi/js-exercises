export const safeJsonParse = (
  input: string
): { success: true; data: any } | { success: false; error: string } => {
  try {
    return { success: true, data: JSON.parse(input) };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
};
