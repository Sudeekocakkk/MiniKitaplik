import { useEffect, useMemo, useState } from "react";
import "./App.css";

/* ——— KLASİK KİTAPLAR ——— */
const KITAPLAR = [
  { id: 1,  baslik: "Savaş ve Barış",        yazar: "Lev Tolstoy",           kategori: "Roman" },
  { id: 2,  baslik: "Suç ve Ceza",           yazar: "Fyodor Dostoyevski",    kategori: "Roman" },
  { id: 3,  baslik: "Anna Karenina",         yazar: "Lev Tolstoy",           kategori: "Roman" },
  { id: 4,  baslik: "Madame Bovary",         yazar: "Gustave Flaubert",      kategori: "Roman" },
  { id: 5,  baslik: "Don Kişot",             yazar: "Miguel de Cervantes",   kategori: "Roman" },
  { id: 6,  baslik: "Karamazov Kardeşler",   yazar: "Fyodor Dostoyevski",    kategori: "Roman" },
  { id: 7,  baslik: "Yeraltından Notlar",    yazar: "Fyodor Dostoyevski",    kategori: "Roman" },
  { id: 8,  baslik: "Büyük Umutlar",         yazar: "Charles Dickens",       kategori: "Roman" },
  { id: 9,  baslik: "Jane Eyre",             yazar: "Charlotte Brontë",      kategori: "Roman" },
  { id: 10, baslik: "Uğultulu Tepeler",      yazar: "Emily Brontë",          kategori: "Roman" },
  { id: 11, baslik: "1984",                  yazar: "George Orwell",         kategori: "Distopya" },
  { id: 12, baslik: "Hayvan Çiftliği",       yazar: "George Orwell",         kategori: "Distopya" },
  { id: 13, baslik: "Körlük",                yazar: "José Saramago",         kategori: "Roman" },
  { id: 14, baslik: "Dava",                  yazar: "Franz Kafka",           kategori: "Roman" },
  { id: 15, baslik: "Yabancı",               yazar: "Albert Camus",          kategori: "Felsefe" },
  { id: 16, baslik: "Devlet",                yazar: "Platon",                kategori: "Felsefe" },
  { id: 17, baslik: "Nikomakhos’a Etik",     yazar: "Aristoteles",           kategori: "Felsefe" },
  { id: 18, baslik: "Sophie’nin Dünyası",    yazar: "Jostein Gaarder",       kategori: "Felsefe" },
  { id: 19, baslik: "Zamanın Kısa Tarihi",   yazar: "Stephen Hawking",       kategori: "Bilim" },
  { id: 20, baslik: "Kozmos",                yazar: "Carl Sagan",            kategori: "Bilim" },
];

const TUMU = "Tümü";

/* ——— Küçük iç bileşenler (tek dosyada) ——— */
function Arama({ value, onChange }) {
  return (
    <input
      className="input"
      placeholder="Başlık yaz ve ara…"
      value={value}
      onChange={(e)=>onChange(e.target.value)}
    />
  );
}

function Kategori({ liste, value, onChange }) {
  return (
    <select className="select" value={value} onChange={(e)=>onChange(e.target.value)}>
      {liste.map(k => <option key={k} value={k}>{k}</option>)}
    </select>
  );
}

function Kart({ kitap, isFav, onToggle }) {
  return (
    <div className="book">
      <div>
        <div className="book-title">{kitap.baslik}</div>
        <div className="book-sub">
          {kitap.yazar} · <span className="chip">{kitap.kategori}</span>
        </div>
      </div>
      <button className={`btn btn-fav ${isFav ? "is-fav" : ""}`} onClick={()=>onToggle(kitap.id)}>
        {isFav ? "★ Favoride · Kaldır" : "☆ Favori Ekle"}
      </button>
    </div>
  );
}

/* ——— Ana Bileşen ——— */
export default function App() {
  // kalıcı anahtarlar
  const LS_ARAMA = "mini-kitaplik:arama";
  const LS_FAV   = "mini-kitaplik:favoriler";

  // state
  const [arama, setArama] = useState(()=>localStorage.getItem(LS_ARAMA) ?? "");
  const [kategori, setKategori] = useState(TUMU);
  const [favoriler, setFavoriler] = useState(()=>{
    try{ return JSON.parse(localStorage.getItem(LS_FAV)) ?? []; }catch{ return []; }
  });

  // persist
  useEffect(()=>localStorage.setItem(LS_ARAMA, arama), [arama]);
  useEffect(()=>localStorage.setItem(LS_FAV, JSON.stringify(favoriler)), [favoriler]);

  // kategoriler
  const kategoriler = useMemo(()=>[TUMU, ...Array.from(new Set(KITAPLAR.map(k=>k.kategori)))], []);

  // filtre
  const filtreli = useMemo(()=>{
    const q = arama.trim().toLowerCase();
    return KITAPLAR.filter(k => {
      const katOk = kategori===TUMU || k.kategori===kategori;
      const araOk = q==="" || k.baslik.toLowerCase().includes(q);
      return katOk && araOk;
    });
  }, [arama, kategori]);

  // fav ekle/çıkar
  const toggleFav = (id)=>setFavoriler(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  // panel için fav kitaplar
  const favDetay = useMemo(()=>KITAPLAR.filter(k=>favoriler.includes(k.id)), [favoriler]);

  return (
    <div className="wrap">
      <h1>Mini Kitaplık</h1>

      <div className="toolbar">
        <Arama value={arama} onChange={setArama} />
        <Kategori liste={kategoriler} value={kategori} onChange={setKategori} />
      </div>

      <div className="grid">
        {/* Sol: Liste */}
        <div className="card">
          {filtreli.length === 0 ? (
            <div className="empty">Eşleşen kitap bulunamadı.</div>
          ) : (
            <div className="list">
              {filtreli.map(k=>(
                <Kart key={k.id} kitap={k} isFav={favoriler.includes(k.id)} onToggle={toggleFav}/>
              ))}
            </div>
          )}
        </div>

        {/* Sağ: Favoriler */}
        <aside className="panel">
          <div className="panel-head">
            <span>❤ Favoriler</span>
            <span className="badge">{favoriler.length}</span>
          </div>

          {favDetay.length === 0 ? (
            <div className="empty">Henüz favori eklenmedi.</div>
          ) : (
            <div className="fav-list">
              {favDetay.map(k=>(
                <div key={k.id} className="fav-item">
                  <div>
                    <div className="book-title" style={{fontSize:14}}>{k.baslik}</div>
                    <div className="book-sub" style={{fontSize:12}}>{k.yazar}</div>
                  </div>
                  <button className="btn" onClick={()=>toggleFav(k.id)}>Kaldır</button>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
