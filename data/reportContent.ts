export interface ReportSection {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  position: [number, number, number];
  content: {
    heading: string;
    paragraphs: string[];
  };
}

export const reportSections: ReportSection[] = [
  {
    id: "introduction",
    title: "Inledning",
    subtitle: "Projektets bakgrund och syfte",
    color: "#E8A838",
    position: [0, 0, 0],
    content: {
      heading: "Inledning",
      paragraphs: [
        "Välkommen till vår interaktiva projektrapport. Detta projekt utforskar nya sätt att presentera akademiskt innehåll genom immersiva 3D-upplevelser.",
        "Syftet med detta projekt är att undersöka hur interaktiva visualiseringar kan förbättra förståelsen och engagemanget för vetenskapligt material.",
        "Genom att navigera genom detta virtuella universum kommer du att upptäcka varje del av vår forskningsresa, från de första frågorna till våra slutgiltiga slutsatser.",
      ],
    },
  },
  {
    id: "method",
    title: "Metod",
    subtitle: "Forskningsdesign och tillvägagångssätt",
    color: "#3B82F6",
    position: [8, 2, -5],
    content: {
      heading: "Metod",
      paragraphs: [
        "Vi använde en mixed-methods approach som kombinerar kvantitativa och kvalitativa forskningsmetoder för att få en heltäckande bild av problemet.",
        "Datainsamlingen genomfördes genom strukturerade intervjuer med 50 deltagare samt analys av befintlig litteratur inom området.",
        "All data analyserades med hjälp av tematisk analys för kvalitativa data och statistiska metoder för kvantitativa data.",
      ],
    },
  },
  {
    id: "results",
    title: "Resultat",
    subtitle: "Våra upptäckter och fynd",
    color: "#10B981",
    position: [-7, -1, -8],
    content: {
      heading: "Resultat",
      paragraphs: [
        "Våra resultat visar en signifikant ökning av användarengagemang när interaktiva 3D-element används i presentationer jämfört med traditionella metoder.",
        "85% av deltagarna rapporterade förbättrad förståelse av komplexa koncept när de presenterades i ett immersivt format.",
        "Vi identifierade även tre huvudteman som påverkar användarupplevelsen: navigation, visuell design och innehållsstruktur.",
      ],
    },
  },
  {
    id: "discussion",
    title: "Diskussion",
    subtitle: "Analys och reflektion",
    color: "#A855F7",
    position: [6, -2, -12],
    content: {
      heading: "Diskussion",
      paragraphs: [
        "Resultaten stödjer vår hypotes att interaktiva visualiseringar kan förbättra lärande och förståelse avsevärt.",
        "Det är dock viktigt att notera att tekniska begränsningar och tillgänglighet fortfarande utgör utmaningar för bred implementering.",
        "Framtida forskning bör fokusera på att göra dessa teknologier mer tillgängliga och undersöka långsiktiga effekter på kunskapsretention.",
      ],
    },
  },
  {
    id: "conclusion",
    title: "Slutsats",
    subtitle: "Sammanfattning och rekommendationer",
    color: "#EAB308",
    position: [-5, 3, -15],
    content: {
      heading: "Slutsats",
      paragraphs: [
        "Denna studie demonstrerar potentialen i immersiva teknologier för kunskapsförmedling och presentationer.",
        "Vi rekommenderar att utbildningsinstitutioner och organisationer utforskar dessa verktyg för att förbättra kommunikation av komplexa idéer.",
        "Med fortsatt utveckling av webteknologier kommer dessa lösningar att bli alltmer tillgängliga och kraftfulla.",
      ],
    },
  },
];
