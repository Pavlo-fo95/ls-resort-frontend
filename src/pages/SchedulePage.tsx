export default function SchedulePage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 40, margin: "0 0 12px" }}>РАСПИСАНИЕ</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>
        Пока ставим базовую страницу. Дальше сделаем таблицу/календарь и подтянем
        реальное расписание.
      </p>
      <div className="container">
        <div className="pageTop">
            <div>
            <h1 className="pageTitle">РАСПИСАНИЕ</h1>
            <p className="pageLead">Скоро подключим календарь. Пока — базовый шаблон.</p>
            </div>
        </div>

        <div className="scheduleCard">
            <div style={{ display: "grid", gap: 10 }}>
            <div className="scheduleRow"><b>Пн</b><span>10:00</span><span>Йога-терапия (группа)</span></div>
            <div className="scheduleRow"><b>Ср</b><span>18:00</span><span>Дыхательные практики (антистресс)</span></div>
            <div className="scheduleRow"><b>Пт</b><span>09:00</span><span>Мягкая растяжка + мобилизация</span></div>
            </div>
        </div>
       </div>
      <div
        style={{
          border: "1px solid rgba(0,0,0,.08)",
          borderRadius: 16,
          padding: 18,
          background: "white",
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <Row day="Пн" time="10:00" title="Йога-терапия (группа)" />
          <Row day="Ср" time="18:00" title="Дыхательные практики (антистресс)" />
          <Row day="Пт" time="09:00" title="Мягкая растяжка + мобилизация" />
        </div>

        <p style={{ marginTop: 16, opacity: 0.7 }}>
          * Тут позже заменим на реальное расписание из Google Calendar / админки.
        </p>
      </div>
    </div>
  );
}

function Row({ day, time, title }: { day: string; time: string; title: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "64px 90px 1fr",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 12,
        background: "rgba(0,0,0,.03)",
      }}
    >
      <b>{day}</b>
      <span>{time}</span>
      <span>{title}</span>
    </div>
  );
}