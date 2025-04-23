<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<header class="header">
  <div class="container header-container">
    <div class="logo">
      <p>Prueba Técnica</p>
    </div>
    <nav class="main-nav">
      <ul class="nav-list">
        <li><a href="#home" class="nav-link" data-en="Home" data-es="Inicio">Home</a></li>
        <li><a href="#services" class="nav-link" data-en="Services" data-es="Servicios">Services</a></li>
        <li><a href="#testimonials" class="nav-link" data-en="Testimonials" data-es="Testimonios">Testimonials</a></li>
        <li><a href="#faq" class="nav-link" data-en="FAQ" data-es="Preguntas">FAQ</a></li>
        <li><a href="#contact" class="nav-link" data-en="Contact" data-es="Contacto">Contact</a></li>
      </ul>
    </nav>
    <div class="header-actions">
      <button class="lang-toggle" id="langToggle">
        <span class="lang-text" data-en="ES" data-es="EN">ES</span>
      </button>
      <button class="menu-toggle" id="menuToggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </div>
</header>
