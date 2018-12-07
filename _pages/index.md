---
permalink: /
layout: index
title: Homepage
---
{% for card in site.data.cards %}
  <div class="cell small-4">
    <!-- card -->
    {% if card.type == "modal" %}
    <a data-open="{{card.id}}">
    {% elsif card.type == "link" %}
    <a href="{{card.link.url}}" target="_blank">
    {% endif %}
      <div class="card{% if card.online %} hide-offline{% endif %}">
          <div class="card-divider">
              {{card.card.title}}
          </div>
          <img src="{{card.card.image.href}}" >
          <div class="card-section">
              {{card.card.body}}
          </div>
      </div>
    </a>

    <!-- reveal -->
    {% if card.type == "modal" %}
    <div class="large reveal" id="{{card.id}}" data-reveal data-animation-in="scale-in-up easeInOut" data-animation-out="scale-out-down easeInOut">
      <h1>
        {{card.modal.title}}
      </h1>
      <p class="lead">{{card.modal.lead}}</p>
        {{card.modal.body}}
      <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
    {% endif %}
  </div>
{% endfor %}
