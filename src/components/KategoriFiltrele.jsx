export default function KategoriFiltre({ setKategori }) {
  return (
    <select onChange={(e) => setKategori(e.target.value)}>
      <option value="">Tüm Kategoriler</option>
      <option value="Programlama">Programlama</option>
      <option value="Roman">Roman</option>
      <option value="Bilim">Bilim</option>
    </select>
  );
}
