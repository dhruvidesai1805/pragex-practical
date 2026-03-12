import StripeSection from "@/components/stripe-section";

export default function Home() {
  return (
    <main className='min-h-screen bg-[#0f1429] bg-dots flex items-center justify-center overflow-hidden'>
      <div className='w-full flex items-center justify-center'>
        <StripeSection />
      </div>
    </main>
  );
}
