<?php

namespace App\Http\Controllers;

use FaithPromise\Shared\Models\Ministry;
use FaithPromise\Shared\Models\Post;
use Illuminate\Support\Facades\Route;
use View;
use Illuminate\Routing\Controller as BaseController;

class MinistriesController extends BaseController {

    public function index($ministry_slug) {
        return view($ministry_slug);
    }

    public function fpKidsWelcome() {
        return view('fpkids-welcome');
    }

    public function fpKidsCamp() {
        return view('fpkids-camp');
    }

    public function family() {
        return view('family', [
            'what_to_expect_cards' => Post::byLocation('family_ministry_for_kids')->get()
        ]);
    }

    public function defaultMinistryPage() {

        $ministry_slug = Route::getCurrentRoute()->getUri();

        return view($ministry_slug, [
            'ministry' => Ministry::whereSlug($ministry_slug)->first()
        ]);

    }

}