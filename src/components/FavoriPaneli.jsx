export default function FavoriPaneli({ favoriler, kitaplar }) {
  const favoriKitaplar = kitaplar.filter(k => favoriler.includes(k.id));
  return (
    <div className="favori-paneli">
      <h2>❤️ Favoriler ({favoriKitaplar.length})</h2>
      <ul>
        {favoriKitaplar.map(k => <li key={k.id}>{k.baslik}</li>)}
      </ul>
    </div>
  );
}
