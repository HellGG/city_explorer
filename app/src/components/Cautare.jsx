export default function Cautare({ valoare, onChange }) {
  return (
    <div className="cautare">
      <input
        type="search"
        value={valoare}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Caută după oraș sau țară"
        aria-label="Caută după oraș sau țară"
      />
    </div>
  )
}
