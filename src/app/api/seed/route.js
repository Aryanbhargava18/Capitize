import { seedTransactions } from "@/actions/seed";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("Seed disabled in production", { status: 403 });
  }

  try {
    await seedTransactions();
    return new Response("Database seeded successfully", { status: 200 });
  } catch (error) {
    console.error("Seed error:", error);
    return new Response("Seeding failed", { status: 500 });
  }
}
