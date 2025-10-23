export default function KitapKarti({ id, baslik, yazar, kategori, favorideMi, favoriToggle }) {
  return (
    <div className="kitap-karti">
      <h3>{baslik}</h3>
      <p>✍️ {yazar}</p>
      <p>📂 {kategori}</p>
      <button onClick={() => favoriToggle(id)}>
        {favorideMi ? "Favorilerden Çıkar" : "Favoriye Ekle"}
      </button>
    </div>
  );
}
