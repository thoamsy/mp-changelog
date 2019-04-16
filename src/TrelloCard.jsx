import React from 'react';

const TrelloCard = ({ fields = [], name, desc }) => {
  return (
    <section className="section" tabIndex="0">
      <h1 className="title is-3">{name}</h1>
      {fields.map(field => (
        <h3 className="subtitle is-5" key={field.id}>
          {field.name}:{field.value}
        </h3>
      ))}
      <article className="message">
        <div className="message-body">{desc}</div>
      </article>
    </section>
  );
};

export default TrelloCard;
