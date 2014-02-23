var express = require('express'),
    passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    _ = require('lodash');

var GOOGLE_CLIENT_ID = '244238413565-kjov60ktbp7de4mqpf41bfteom69c07g.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET = 'CFqYglNGe1JawH8_Am5b_8m8';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));


var app = express();

// configure Express
app.configure(function() {
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'so secret' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
    }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/error'}),
    function (req, res) {
      res.redirect('/');
    });

// logout
app.get('/auth/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/error', function (req, res) {
  res.send(403);
});

app.get('/api/articles', function (req, res) {
  var payload;
  if (req.isAuthenticated()) {
    payload = articles.map(function (article) {
      article = _.extend({}, article);
      article.body = article.body.replace('|||', '');
      return article;
    });
  } else {
    payload = articles.reduce(function (acc, cur) {
      var article;
      if (!cur.paywall) {
        article = _.extend({}, cur);
        article.body = article.body.substring(0, article.body.indexOf('|||'));
        acc.push(article);
      }
      return acc;
    }, []);
  }
  res.json(payload);
});

app.get('/api/articles/:slug', function (req, res) {
  var article = _.extend({}, _.find(articles, {slug: req.params.slug}));
  if (req.isAuthenticated()) {
    article.body = article.body.replace('|||', '');
  } else {
    article.body = article.body.substring(0, article.body.indexOf('|||'));
  }
  res.json(article);
});

app.get('/api/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.send(401);
  }
});

app.listen(3000);
console.log('listening on port 3000...');


var articles = [
  {
    paywall: false,
    slug: 'phasellus-ac-risus',
    title: 'Phasellus ac risus',
    body: '<p>Phasellus ac risus at dolor lobortis tincidunt vel varius sapien. Donec nec velit mollis elit ultricies consectetur vitae pharetra massa. Vestibulum venenatis condimentum urna, at rutrum erat lacinia ut. Morbi lacinia purus est, in consequat quam adipiscing et. Donec imperdiet arcu eget nunc condimentum faucibus. Quisque sagittis accumsan nisi viverra porta. Phasellus et elementum dui. Fusce malesuada tincidunt dignissim. Sed ligula sem, hendrerit in quam ut, accumsan interdum tellus. Etiam in libero placerat, tempus nibh sed, tincidunt nisi. Nulla ut eros tempor, dictum ipsum in, placerat metus. Aenean in nisi id sem dictum dignissim. Aliquam consectetur lacus nec ultricies feugiat. Suspendisse posuere lorem sem, vel aliquet leo pellentesque non.</p>|||<p>Vivamus vestibulum mauris et neque mollis mattis. Etiam mi felis, pretium ut magna nec, iaculis convallis massa. Nulla at gravida dui. Morbi at arcu consequat, suscipit mi quis, vehicula tortor. Praesent viverra, tellus quis tristique luctus, nulla ligula fringilla purus, eget rhoncus sapien felis laoreet tortor. Mauris ornare eget justo ac malesuada. Nullam rhoncus tortor vitae nisi adipiscing placerat. Vivamus volutpat fringilla leo sed dignissim. Integer ac erat at erat sodales cursus et ac eros. Praesent feugiat non nunc ut tempor. Vivamus blandit lectus sit amet est rhoncus condimentum in sed augue. Morbi scelerisque turpis ac porttitor semper.</p>'
  },
  {
    paywall: false,
    slug: 'suspendisse-quis-sem',
    title: 'Suspendisse quis sem',
    body: '<p>Suspendisse quis sem ut elit tristique dapibus ut eu orci. Phasellus lorem massa, luctus et iaculis vitae, venenatis scelerisque enim. Curabitur in ultricies est, vehicula tempor felis. Ut sodales ligula nec tincidunt commodo. Sed sodales ut lectus non cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse potenti.<p/>|||<p>Pellentesque a nulla lectus. Donec vel ipsum auctor nisi faucibus fringilla id vel mi. Vivamus mi quam, suscipit eu euismod feugiat, bibendum vel leo. Nulla bibendum tempus ullamcorper. Maecenas vel iaculis orci, ac pretium elit. Integer ullamcorper nibh sit amet turpis semper, vitae malesuada diam rutrum. Nulla tincidunt blandit sagittis. Maecenas tempus, nisl quis feugiat aliquet, dui augue commodo sapien, id egestas dolor ipsum vel mi. Aliquam risus mi, tempor vel rutrum sed, auctor nec metus. Vivamus tincidunt tristique mi id elementum. Curabitur dignissim lectus et elementum pretium. Integer augue enim, faucibus interdum fermentum a, mattis quis est. Duis sagittis odio ut posuere tincidunt. Donec a risus vestibulum justo ultrices adipiscing vitae condimentum tellus. Donec consectetur metus in aliquam semper.</p>'
  },
  {
    paywall: true,
    slug: 'pellentesque-sit-amet',
    title: 'Pellentesque sit amet',
    body: '<p>Pellentesque sit amet eros ipsum. Nullam accumsan, nibh eget dignissim venenatis, dolor lacus porta quam, et lobortis quam sapien elementum mauris. Praesent interdum massa nec euismod iaculis. Maecenas gravida turpis eget tortor feugiat adipiscing. Pellentesque nunc massa, luctus id tincidunt eget, interdum vitae felis. Ut mattis dui id mauris vestibulum aliquam. Sed mollis vestibulum nibh in consectetur.</p>|||<p>Proin lectus diam, imperdiet non tristique et, laoreet imperdiet nibh.</p>'
  }
];