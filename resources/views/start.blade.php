<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <script>
            window.title = '{{ config('app.name', 'Laravel') }}';
        </script>
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;600;800&display=swap" rel="stylesheet">
        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/start.css') }}">

        <!-- Scripts -->
        @routes
    </head>
    <body class="font-sans antialiased">
        @inertia
        @env ('local')
            <script src="js/start.js"></script>
        @endenv
        @env ('production')
            <script src="{{ mix('js/start.js') }}" ></script>
        @endenv
    </body>
</html>
