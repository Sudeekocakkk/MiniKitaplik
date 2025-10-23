export default function AramaCubugu({ aramaMetni, setAramaMetni }) {
  return (
    <input
      type="text"
      placeholder="Kitap ara..."
      value={aramaMetni}
      onChange={(e) => setAramaMetni(e.target.value)}
    />
  );
}
