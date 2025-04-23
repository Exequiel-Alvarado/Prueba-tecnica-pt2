<?php
/**
 * Funciones del tema Prueba Técnica PT1
 */

if ( ! function_exists( 'pt1_setup' ) ) {
  function pt1_setup() {
    // Título dinámico
    add_theme_support( 'title-tag' );
    // Etiquetas HTML5 para formularios, galerías y comentarios
    add_theme_support( 'html5', array( 'search-form', 'comment-form', 'gallery', 'caption' ) );
  }
}
add_action( 'after_setup_theme', 'pt1_setup' );

function pt1_enqueue_scripts() {
    // Hoja de estilo principal (style.css)
    wp_enqueue_style( 'pt1-style', get_stylesheet_uri());
    // Font Awesome CDN
    wp_enqueue_style('pt1-styles', get_template_directory_uri() . '/assets/css/style.css');
    // Google Fonts Poppins
   
    // Tu JS (mueve tu scripts.js a assets/js/scripts.js)
    wp_enqueue_script( 'pt1-scripts',
      get_template_directory_uri() . '/assets/js/scripts.js',
      array(), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'pt1_enqueue_scripts' );
