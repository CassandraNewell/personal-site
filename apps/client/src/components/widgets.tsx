import { useState } from "react";

function ColorMixer() {
  const [r, setR] = useState(198);
  const [g, setG] = useState(123);
  const [b, setB] = useState(92);

  const color = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="bg-white rounded-xl border border-sand p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-bark mb-4">
        Color Mixer
      </h3>
      <div
        className="w-full h-20 rounded-lg mb-4 border border-sand"
        style={{ backgroundColor: color }}
      />
      <div className="space-y-3 text-sm">
        {[
          { label: "R", value: r, set: setR },
          { label: "G", value: g, set: setG },
          { label: "B", value: b, set: setB },
        ].map(({ label, value, set }) => (
          <label key={label} className="flex items-center gap-3 text-warm-700">
            <span className="w-4 font-medium">{label}</span>
            <input
              type="range"
              min={0}
              max={255}
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              className="flex-1 accent-terracotta"
            />
            <span className="w-8 text-right tabular-nums">{value}</span>
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-warm-400 font-mono">{color}</p>
    </div>
  );
}

function WordCounter() {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="bg-white rounded-xl border border-sand p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-bark mb-4">
        Word Counter
      </h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type some text..."
        className="w-full h-28 rounded-lg border border-sand bg-warm-50 p-3 text-sm text-charcoal placeholder:text-warm-300 focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none"
      />
      <div className="mt-3 flex gap-4 text-sm text-warm-600">
        <span>
          <strong className="text-bark">{words}</strong> words
        </span>
        <span>
          <strong className="text-bark">{chars}</strong> characters
        </span>
      </div>
    </div>
  );
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("20");

  const c = parseFloat(celsius);
  const fahrenheit = isNaN(c) ? "—" : ((c * 9) / 5 + 32).toFixed(1);
  const kelvin = isNaN(c) ? "—" : (c + 273.15).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-sand p-6 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-bark mb-4">
        Temperature Converter
      </h3>
      <label className="block text-sm text-warm-600 mb-2">Celsius</label>
      <input
        type="number"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
        className="w-full rounded-lg border border-sand bg-warm-50 px-3 py-2 text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
      <div className="mt-4 space-y-2 text-sm text-warm-600">
        <p>
          Fahrenheit: <strong className="text-bark">{fahrenheit}°F</strong>
        </p>
        <p>
          Kelvin: <strong className="text-bark">{kelvin} K</strong>
        </p>
      </div>
    </div>
  );
}

export function Widgets() {
  return (
    <section id="widgets" className="py-16 px-6 bg-warm-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-bark mb-2">
          Widgets
        </h2>
        <p className="text-warm-500 mb-10">
          Small interactive experiments — built for fun and curiosity.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ColorMixer />
          <WordCounter />
          <TemperatureConverter />
        </div>
      </div>
    </section>
  );
}
