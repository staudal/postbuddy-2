import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PostBuddy",
  description: "The landing page of the app.",
};

export default function Index() {
  return (
    <div className="container py-6">
      <p>The landing page is under development.</p>
      <p className="text-primary hover:underline">
        <Link href="/login">Log in to your account</Link>
      </p>
    </div>
  );
}
