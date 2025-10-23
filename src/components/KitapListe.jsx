import KitapKarti from "./KitapKarti.jsx";

export default function KitapListe({ kitaplar = [], favoriler = [], favoriToggle }) {
  if (!Array.isArray(kitaplar)) return null;

  return (
    <div className="kitap-liste">
      {kitaplar.map(k => (
        <KitapKarti
          key={k.id}
          {...k}
          favorideMi={favoriler.includes(k.id)}
          favoriToggle={favoriToggle}
        />
      ))}
    </div>
  );
}
