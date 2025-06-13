const TRANSLATIONS = {
    en: {
        meta: {
            title: "Game.net.im - Free Online Games | Play Instantly",
            description: "A curated collection of 500+ free online games. Play instantly without login. Featuring casual, puzzle, action, and sports games for endless entertainment.",
            keywords: "online games, free games, casual games, HTML5 games, browser games"
        },
        nav: {
            trending: "Trending",
            casual: "Casual",
            puzzle: "Puzzle",
            action: "Action",
            sports: "Sports",
            racing: "Racing",
            strategy: "Strategy"
        },
        sections: {
            trending: "Trending Games",
            casual: "Casual Games",
            puzzle: "Puzzle Games",
            action: "Action Games",
            sports: "Sports Games",
            racing: "Racing Games",
            strategy: "Strategy Games",
            favorites: "Favorite Games",
            searchResults: "Search Results"
        },
        ui: {
            search: "Search games...",
            allGames: "All Games",
            viewAll: "View All",
            plays: "plays",
            loading: "Loading...",
            noResults: "No games found. Try different keywords.",
            rateGame: "Rate Game",
            shareGame: "Share",
            close: "Close",
            submitRating: "Submit Rating"
        },
        footer: {
            copyright: "© 2024 Game.net.im - Curated Collection of Free Online Games",
            rights: "All games are property of their respective owners"
        }
    },
    zh: {
        meta: {
            title: "Game.net.im - 免费在线游戏 | 即点即玩",
            description: "精选500多款免费在线游戏，无需登录即可畅玩。提供休闲、益智、动作和体育等多种类型游戏，带来无尽娱乐体验。",
            keywords: "在线游戏,免费游戏,休闲游戏,HTML5游戏,浏览器游戏"
        },
        nav: {
            trending: "热门",
            casual: "休闲",
            puzzle: "益智",
            action: "动作",
            sports: "体育",
            racing: "竞速",
            strategy: "策略"
        },
        sections: {
            trending: "热门游戏",
            casual: "休闲游戏",
            puzzle: "益智游戏",
            action: "动作游戏",
            sports: "体育游戏",
            racing: "竞速游戏",
            strategy: "策略游戏",
            favorites: "收藏游戏",
            searchResults: "搜索结果"
        },
        ui: {
            search: "搜索游戏...",
            allGames: "全部游戏",
            viewAll: "查看全部",
            plays: "次游戏",
            loading: "加载中...",
            noResults: "未找到游戏，请尝试其他关键词。",
            rateGame: "评分",
            shareGame: "分享",
            close: "关闭",
            submitRating: "提交评分"
        },
        footer: {
            copyright: "© 2024 Game.net.im - 精选免费在线游戏平台",
            rights: "所有游戏版权归原作者所有"
        }
    },
    hi: {
        meta: {
            title: "Game.net.im - मुफ्त ऑनलाइन गेम्स | तुरंत खेलें",
            description: "500+ मुफ्त ऑनलाइन गेम्स का संग्रह। बिना लॉगिन के तुरंत खेलें। कैजुअल, पज़ल, एक्शन और स्पोर्ट्स गेम्स के साथ अनंत मनोरंजन।",
            keywords: "ऑनलाइन गेम्स, मुफ्त गेम्स, कैजुअल गेम्स, HTML5 गेम्स, ब्राउज़र गेम्स"
        },
        nav: {
            trending: "ट्रेंडिंग",
            casual: "कैजुअल",
            puzzle: "पज़ल",
            action: "एक्शन",
            sports: "स्पोर्ट्स",
            racing: "रेसिंग",
            strategy: "स्ट्रैटजी"
        },
        // ... 继续添加印地语翻译
    },
    fr: {
        meta: {
            title: "Game.net.im - Jeux en Ligne Gratuits | Jouez Instantanément",
            description: "Une collection de plus de 500 jeux en ligne gratuits. Jouez instantanément sans connexion. Des jeux casual, puzzle, action et sports pour un divertissement sans fin.",
            keywords: "jeux en ligne, jeux gratuits, jeux casual, jeux HTML5, jeux navigateur"
        },
        nav: {
            trending: "Tendances",
            casual: "Casual",
            puzzle: "Puzzle",
            action: "Action",
            sports: "Sports",
            racing: "Course",
            strategy: "Stratégie"
        },
        // ... 继续添加法语翻译
    },
    ar: {
        meta: {
            title: "Game.net.im - ألعاب مجانية على الإنترنت | العب فوراً",
            description: "مجموعة مختارة من أكثر من 500 لعبة مجانية عبر الإنترنت. العب فوراً بدون تسجيل دخول. ألعاب ترفيهية وألغاز وأكشن ورياضة للترفيه اللانهائي.",
            keywords: "ألعاب اونلاين, العاب مجانية, العاب ترفيهية, العاب HTML5, العاب متصفح"
        },
        // ... 继续添加阿拉伯语翻译
    },
    es: {
        meta: {
            title: "Game.net.im - Juegos en Línea Gratis | Juega al Instante",
            description: "Una colección de más de 500 juegos en línea gratuitos. Juega al instante sin iniciar sesión. Juegos casuales, de rompecabezas, acción y deportes para entretenimiento sin fin.",
            keywords: "juegos en línea, juegos gratis, juegos casuales, juegos HTML5, juegos de navegador"
        },
        // ... 继续添加西班牙语翻译
    },
    ja: {
        meta: {
            title: "Game.net.im - 無料オンラインゲーム | 今すぐプレイ",
            description: "500以上の無料オンラインゲームを厳選。ログイン不要で即プレイ。カジュアル、パズル、アクション、スポーツなど、様々なジャンルのゲームで無限の楽しみを。",
            keywords: "オンラインゲーム,無料ゲーム,カジュアルゲーム,HTML5ゲーム,ブラウザゲーム"
        },
        // ... 继续添加日语翻译
    },
    ru: {
        meta: {
            title: "Game.net.im - Бесплатные Онлайн Игры | Играйте Мгновенно",
            description: "Коллекция из более чем 500 бесплатных онлайн-игр. Играйте мгновенно без входа в систему. Казуальные игры, головоломки, экшн и спортивные игры для бесконечного развлечения.",
            keywords: "онлайн игры, бесплатные игры, казуальные игры, HTML5 игры, браузерные игры"
        },
        // ... 继续添加俄语翻译
    },
    pt: {
        meta: {
            title: "Game.net.im - Jogos Online Grátis | Jogue Instantaneamente",
            description: "Uma coleção de mais de 500 jogos online gratuitos. Jogue instantaneamente sem login. Jogos casuais, puzzle, ação e esportes para entretenimento sem fim.",
            keywords: "jogos online, jogos grátis, jogos casuais, jogos HTML5, jogos de navegador"
        },
        // ... 继续添加葡萄牙语翻译
    },
    de: {
        meta: {
            title: "Game.net.im - Kostenlose Online Spiele | Sofort Spielen",
            description: "Eine Sammlung von über 500 kostenlosen Online-Spielen. Spielen Sie sofort ohne Anmeldung. Casual-, Puzzle-, Action- und Sportspiele für endlose Unterhaltung.",
            keywords: "Online Spiele, kostenlose Spiele, Casual Spiele, HTML5 Spiele, Browser Spiele"
        },
        // ... 继续添加德语翻译
    },
    ko: {
        meta: {
            title: "Game.net.im - 무료 온라인 게임 | 즉시 플레이",
            description: "500개 이상의 무료 온라인 게임 컬렉션. 로그인 없이 즉시 플레이. 캐주얼, 퍼즐, 액션, 스포츠 게임으로 끝없는 재미를 즐기세요.",
            keywords: "온라인 게임,무료 게임,캐주얼 게임,HTML5 게임,브라우저 게임"
        },
        // ... 继续添加韩语翻译
    }
}; 
