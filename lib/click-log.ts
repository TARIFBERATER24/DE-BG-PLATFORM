export type ClickEvent = {
  network: string;
  slug: string;
  referer: string | null;
};

export async function logClick(event: ClickEvent): Promise<void> {
  console.log("[affiliate-click]", event);
}
