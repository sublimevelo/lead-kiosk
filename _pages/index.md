---
permalink: /
layout: index
title: Onlypage
---
{% for card in site.data.cards %}
  <div class="cell small-4">
    <!-- card -->
    {% if card.type == "modal" %}
    <a data-open="reveal-{{card.id}}">
    {% elsif card.type == "link" %}
    <a href="{{card.link.url}}" target="_blank">
    {% endif %}
      <div class="card{% if card.online %} hide-offline{% endif %}" id="{{card.id}}">
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
    <div class="{% if card.modal.size %} {{ card.modal.size }}{% endif %} reveal" id="reveal-{{card.id}}" data-reveal data-animation-in="scale-in-up easeInOut" data-animation-out="scale-out-down easeInOut">
      <h1>
        {{card.modal.title}}
      </h1>
      {% if card.modal.image.href %}
      <div class="text-center"><img src="{{ card.modal.image.href }}"></div>
      {% endif %}
      {% if card.modal.video.src %}
        <div class="flex-video">
          <video controls width="800">
            <source src="{{card.modal.video.src}}" type="{{card.modal.video.type}}">
          </video>
        </div>
      {% endif %}
      {{card.modal.body}}
      <button class="close-button" data-close aria-label="Close modal" type="button">
          <span aria-hidden="true">&times;</span>
      </button>
    </div>
    {% endif %}
  </div>
{% endfor %}
