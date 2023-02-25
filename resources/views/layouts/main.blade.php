<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Maksim Manzulin">
    <meta name="keywords" content=''>
    <meta name="description" content='Всё для самостоятельных путешествий'>

    <link rel="icon" href="{{asset('favicon.ico')}}" type="image/x-icon">
    <!-- Styles -->
    @vite(['resources/js/app.js'])
    <script src="{{ asset('/js/jquery.min.js') }}"></script>
    @vite(['resources/css/app.css'])
    <link href="{{ asset('/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/bootstrap-reboot.min.css') }}" rel="stylesheet">
    <link href="{{ asset('/css/open-iconic-bootstrap.css') }}" rel="stylesheet">
    <script>
        window.Laravel = <?php echo json_encode(['csrfToken' => csrf_token()]); ?>
    </script>
    <script>
        $(document).ready(function() {
            $('#searchBtn').prop('disabled', true);
            $(document).on('input', 'input[type="text"]', function () {
                const $item = $(this).val().length;
                if($item > 2) {
                    $('#searchBtn').removeAttr('disabled');
                } else {
                    $('#searchBtn').prop('disabled', true);
                };
            });
        });
    </script>
    @stack("head")
    <title>@yield("title")</title>
</head>
<body>
<div id="app">
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="{{ url('/') }}">
                <h2><span class="Tkach">{{ config('app.name') }}.ru</span></h2>
            </a>
        </div>
        <h4>@stack("sitename")</h4>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav mr-auto">
            @stack("navsort")
                @if(auth()->user())
                    <!-- Поиск -->
                    <li class="nav-item">
                        <a
                            class="nav-link"
                            href="#"
                            data-toggle="modal"
                            data-target=".bd-example-modal-xl"
                        >{{ __('Поиск') }}</a>
                    </li>
                    <div
                        class="modal fade bd-example-modal-xl"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="myExtraLargeModalLabel"
                        aria-hidden="true"
                    >
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div style="margin: 20px" class="row justify-content-center">
                                    Найти:
                                    <form
                                        class="form-inline my-auto mx-auto"
                                        action="{{ route('object-search') }}"
                                        method="post"
                                    >
                                        {{ csrf_field() }}
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">?</div>
                                        </div>
                                        <input
                                            id="searchI"
                                            placeholder="Не менее трех символов"
                                            type="text"
                                            required
                                            autofocus
                                            min="3"
                                            name="txtSearch"
                                            class="form-control mr-sm-2"
                                            type="search"
                                            aria-label="Search"
                                        >
                                        <button
                                            id="searchBtn"
                                            disabled
                                            class="btn btn-sm btn-outline-success my-2 my-sm-0"
                                            type="submit"
                                        >
                                            Поиск
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                @endif
                <!-- Authentication Links -->
                @if(Auth::guest())
                    <li class="nav-item">
                        <a class="nav-link"
                           href="{{ route('login', ['action' => 'main', 'slim' => null]) }}">{{ __('Login') }}</a>
                    </li>
                    {{--
                    @if (Route::has('register'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                        </li>
                    @endif
                    --}}
                @else
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                            {{ Auth::user()->name }}<span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>

                            @can ("manipulate", "App\User")
                                <a class="dropdown-item" href="/system/all">
                                    {{ __('Админка') }}
                                </a>
                            @endcan
                            <a class="dropdown-item" href="{{ route('logout') }}">
                                {{ __('Logout') }}
                            </a>
                        </div>
                    </li>
                @endif
            </ul>
        </div>
    </nav>

    <main class="py-4">
        @yield('content')
    </main>
</div>
</body>
</html>
