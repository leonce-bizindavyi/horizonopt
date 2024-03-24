import InsightRoll from "@/src/components/About/InsightRoll";


const insights = [
    "20+ opportunités dans cette semaine",
    "3+ Ans au travail",
    "99%  Satisfactions de Clients",
    "20K+ abonnés",
    "50+ Entreprise partenaires",
  ];

export default function AboutLayout({ children }) {
  return (
    <main className="w-full flex flex-col items-center justify-between">
      <InsightRoll insights={insights} />
      {children}
    </main>
  );
}
