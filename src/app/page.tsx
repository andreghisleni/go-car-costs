import { MileageList } from './mileage-list';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-6">
      <h1 className="text-3xl">Kilometers per liter</h1>
      <MileageList />
    </main>
  );
}
