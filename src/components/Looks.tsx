import { Clock, Zap, CheckCircle2 } from 'lucide-react';

export default function Looks() {
  const sections = [
    {
      title: "MORGENS (beim Aufwachen) – ~5 Min",
      items: [
        {
          label: "LYMPHDRAINAGE (2 Min)",
          details: [
            "Flache Hand, sanfte Striche von Mitte des Gesichts nach außen Richtung Ohr",
            "Dann sanft den Hals runter",
            "Ringfinger unter Augen von innen nach außen",
            "Immer mit Moisturizer/Öl"
          ]
        },
        {
          label: "JAWLINE MASSAGE (2 Min)",
          details: [
            "Knöchel entlang Kiefer nach oben ziehen",
            "Masseter (vor dem Ohr) kreisend massieren",
            "Fester aber nicht schmerzhafter Druck"
          ]
        },
        {
          label: "WANGEN MASSAGE (1 Min)",
          details: [
            "Handballen flach auf Wange",
            "Kreisende Bewegungen nach oben außen",
            "Nie nach unten ziehen"
          ]
        }
      ]
    },
    {
      title: "TÄGLICH (morgens oder abends) – ~15 Min",
      items: [
        {
          label: "CHIN TUCKS",
          details: [
            "Kinn gerade nach hinten schieben (kein Nicken, nur zurück)",
            "Doppelkinn entsteht kurz – das ist richtig",
            "3x10 Wiederholungen, 2 Sek halten"
          ]
        },
        {
          label: "NECK CURL (liegend)",
          details: [
            "Flach hinlegen",
            "Nur mit Nackenmuskel Kinn zur Brust heben",
            "Kein Schwung",
            "3x15 Wiederholungen"
          ]
        },
        {
          label: "NECK EXTENSION",
          details: [
            "Kopf langsam nach hinten",
            "Hand gibt leichten Gegendruck",
            "3x10, je 10 Sek halten"
          ]
        },
        {
          label: "ISOMETRISCHER WIDERSTAND (4 Richtungen)",
          details: [
            "Hand gegen Stirn/Hinterkopf/Schläfen – dagegen drücken",
            "Nicht bewegen, nur Spannung",
            "Je 10 Sek halten, 3x pro Richtung"
          ]
        },
        {
          label: "KINN-STRECK ÜBUNG",
          details: [
            "Kinn nach oben strecken",
            "Unterlippe über Oberlippe schieben",
            "10x, je 10 Sek halten"
          ]
        },
        {
          label: "WANGENKNOCHEN WIDERSTAND",
          details: [
            "Breit lächeln",
            "Finger leicht auf Wangen, Widerstand geben",
            "3x30 Sek"
          ]
        },
        {
          label: "BROWBONE WIDERSTAND",
          details: [
            "Augenbrauen mit Fingern runterdrücken",
            "Dagegen hochziehen",
            "3x10 Sek halten"
          ]
        }
      ]
    },
    {
      title: "GANZEN TAG – 0 Min extra",
      items: [
        {
          label: "MEWING (immer, überall)",
          details: [
            "Gesamte Zunge flach an Gaumen pressen",
            "Mund geschlossen, Zähne leicht berühren",
            "Wird zur Gewohnheit nach 2-3 Wochen"
          ]
        },
        {
          label: "MASTIC GUM KAUEN",
          details: [
            "20-30 Min täglich",
            "Beide Seiten gleichmäßig kauen"
          ]
        },
        {
          label: "HALTUNG",
          details: [
            "Schultern zurück",
            "Ohren über Schultern, Kopf gerade"
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">Physical Appearance</h2>
        <p className="text-xl font-bold tracking-tight uppercase underline decoration-zinc-800 underline-offset-8">Gesicht & Nacken Plan</p>
      </header>

      {/* Summary Stats */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <div className="flex items-center gap-2 text-zinc-600">
            <Clock className="w-3 h-3" />
            <span className="text-[9px] uppercase font-bold tracking-widest">Täglicher Aufwand</span>
          </div>
          <div className="text-xl font-mono font-bold">~30 MIN</div>
        </div>
        <div className="bg-zinc-950 border border-zinc-900 p-4 space-y-1">
          <div className="flex items-center gap-2 text-zinc-600">
            <Zap className="w-3 h-3" />
            <span className="text-[9px] uppercase font-bold tracking-widest">Status</span>
          </div>
          <div className="text-xl font-mono font-bold text-zinc-100 italic">ASCENDING</div>
        </div>
      </section>

      <div className="space-y-10">
        {sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-4">
            <h3 className="text-[10px] uppercase font-black text-zinc-500 border-b border-zinc-900 pb-2 tracking-[0.3em]">
              {section.title}
            </h3>
            <div className="space-y-6">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="space-y-2 group">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-zinc-700" />
                    <h4 className="text-xs font-bold uppercase tracking-tight text-zinc-200">
                      {item.label}
                    </h4>
                  </div>
                  <ul className="space-y-1.5 pl-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[11px] text-zinc-500 leading-relaxed list-none border-l border-zinc-900 pl-3">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="pt-8 border-t border-zinc-900 text-center">
        <p className="text-[9px] text-zinc-700 uppercase font-black tracking-[0.5em]">Be ruthless with your potential</p>
      </section>
    </div>
  );
}
