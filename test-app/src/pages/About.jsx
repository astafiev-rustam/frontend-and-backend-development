function About() {
  return (
    <div className="page">
      <h1>О нашем приложении</h1>
      <p>Это учебное приложение создано для изучения React Router.</p>
      <div className="about-content">
        <h2>Наша миссия</h2>
        <p>Помогать разработчикам изучать современные технологии веб-разработки.</p>
        
        <h2>Технологии</h2>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>JavaScript ES6+</li>
        </ul>
      </div>
    </div>
  );
}

export default About;