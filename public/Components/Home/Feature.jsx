const Feature = (props) => (
  <div class="feature">
    <img src={props.url} class="feature-image"></img>
    <h1 class="feature-title">{props.title}</h1>
    <p class="feature-detail">{props.detail}</p>
  </div>
);