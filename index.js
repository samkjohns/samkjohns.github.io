! function() {
  var e, t, i, o, n = null,
    r = {
      companions: "",
      desiredBitrate: 256,
      duration: 30,
      expanded: !1,
      height: 0,
      icons: "",
      linear: !0,
      remainingTime: null,
      skippableState: !0,
      viewMode: "normal",
      width: 0,
      volume: 1,
      volumePrevious: null,
      play: !1,
      started: !1
    },
    a = {},
    d = [{
      event: "AdVideoStart",
      value: 0
    }, {
      event: "AdVideoFirstQuartile",
      value: 25
    }, {
      event: "AdVideoMidpoint",
      value: 50
    }, {
      event: "AdVideoThirdQuartile",
      value: 75
    }, {
      event: "AdVideoComplete",
      value: 100
    }],
    p = 0,
    l = 0,
    u = !1,
    s = function() {
      e = null, t = null
    },
    c = function() {
      o.style.visibility = "visible", o.style.top = "50px", clearInterval(i)
    },
    v = function() {
      s.prototype.skipAd()
    };
  s.prototype.initAd = function(i, o, a, d, p, l) {
    var u = JSON.parse(p.AdParameters);
    r.width = l.videoSlot.clientWidth, r.height = l.videoSlot.clientHeight, r.viewMode = a, r.desiredBitrate = d, window.vpaidJSDimensions = {
      width: r.width,
      height: r.height
    }, e = l.slot, t = l;
    var c = null;
    u.video && (c = {
      mp4: u.video.mp4,
      webm: u.video.webm
    }, c && (e.customvideo = c));
    var v = [].slice;
    n = "string" == typeof p.AdParameters ? JSON.parse(p.AdParameters).creativeData.data : p.AdParameters.creativeData.data;
    var y = !1;
    t.videoSlot.addEventListener("volumechange", function() {
      var e = t.videoSlot.volume <= 0;
      e ? (y = !1, FuiszEvents.trigger(FuiszEvents.ANALYTICS_TRACK, {
        event: "mute",
        data: {}
      })) : y || (y = !0, FuiszEvents.trigger(FuiszEvents.ANALYTICS_TRACK, {
        event: "unmute",
        data: {
          volume: t.videoSlot.volume.toFixed(2)
        }
      }))
    });
    var f = new XMLHttpRequest,
      h = window,
      A = this;
    f.onreadystatechange = function() {
      if (4 === f.readyState) {
        var i = f.responseText;
        var o = document.createElement("div");
        o.id = "fuisz-platform-overlay", o.style.position = "absolute", o.style.top = "0px", o.style.left = "0px", o.style.right = "0px", o.style.bottom = "0px", o.style.width = "100%", o.style.height = "100%", o.innerHTML = i, "undefined" != typeof t.videoSlot ? s.prototype.setCreatePlayer(!1) : s.prototype.setCreatePlayer(!0);
        var n = v.call(o.querySelectorAll("script")).map(function(e) {
          var t = e.type || "application/javascript";
          if (/\bjavascript\b/.test(t)) return e.parentNode.removeChild(e), e.innerHTML
        }).filter(Boolean);
        e.insertAdjacentHTML("beforeend", o.innerHTML), r.createPlayer && (l.videoSlot = e.querySelector("#html5_video")), window._fuisz = {
          rootEl: e
        };
        try {
          e.querySelector(".splash-screen") && (e.querySelector(".splash-screen").style.display = "none"), window._fuisz.isVpaidJs = !0, n.forEach(function(e, t) {
            (e || "" !== e) && h.eval(e)
          }), s.prototype.checkSkip(), window._fuisz.beacon.set({
            adserver: u.adserver || "generic"
          }), "generic" !== u.adserver && "" !== u.adserver && window._fuisz.beacon.set(u.adserver_macros), s.prototype.continueAdLoad_()
        } catch (t) {
          e.innerHTML = "<div style='color:red;'>" + t.stack + "</div>", A.callEvent_("AdError")
        }
      }
    };
    debugger;
    f.open("GET", n, !0), f.send(null)
  }, s.prototype.setCreatePlayer = function(e) {
    r.createPlayer = e
  }, s.prototype.getCreatePlayer = function() {
    return r.createPlayer
  }, s.prototype.getLinearAd = function() {
    return this
  }, s.prototype.checkSkip = function() {
    o = e.querySelector(".skip_to_content_button"), o && (o.style.visibility = "hidden", o.style.cursor = "pointer", o.addEventListener("click", v)), window._fuisz.player.experience.vpaid_options.ad_skippable && window._fuisz.player.experience.vpaid_options.skip_button.timing_offset && (r.skippableState = window._fuisz.player.experience.vpaid_options.ad_skippable, l = window._fuisz.player.experience.vpaid_options.skip_button.timing_offset, i = setInterval(function() {
      c()
    }, 1e3 * l))
  }, s.prototype.continueAdLoad_ = function() {
    this.updateVideoSlot_(), t.videoSlot.addEventListener("timeupdate", this.timeUpdateHandler_.bind(this), !1), t.videoSlot.addEventListener("ended", this.stopAd.bind(this), !1), this.callEvent_("AdLoaded")
  }, s.prototype.updateVideoSlot_ = function() {}, s.prototype.updateVideoPlayerSize_ = function() {
    t.videoSlot.setAttribute("width", r.width), t.videoSlot.setAttribute("height", r.height)
  }, s.prototype.getVideoSlot = function() {
    return t
  }, s.prototype.getSlot = function() {
    return e
  }, s.prototype.callEvent_ = function(e) {
    if (e in a) {
      if ("AdClickThru" === e) return void a[e](null, null, !1);
      a[e]()
    }
  }, s.prototype.timeUpdateHandler_ = function() {
    if (!(p >= d.length)) {
      var e = t.videoSlot.currentTime / t.videoSlot.duration * 100;
      if (r.remainingTime = Math.round(t.videoSlot.duration - t.videoSlot.currentTime), this.callEvent_("AdRemainingTimeChange"), e >= d[p].value) {
        var i = d[p].event;
        "function" == typeof a[i] ? a[i]() : console.warn("Event, " + i + ", doesnt have a callback.", a[i]), p += 1
      }
      return Math.round(r.remainingTime)
    }
  }, s.prototype.startAd = function() {
    t.videoSlot.play(), r.play = !0, this.getStarted() || (this.callEvent_("AdStarted"), this.callEvent_("AdImpression"), r.started = !0)
  }, s.prototype.stopAd = function() {
    u = !1, r.play = !1;
    var e = this.callEvent_.bind(this);
    setTimeout(e, 75, ["AdStopped"])
  }, s.prototype.setAdVolume = function(e) {
    r.volume = e, 0 === r.volume ? FuiszEvents.trigger(FuiszEvents.ANALYTICS_TRACK, {
      event: "mute",
      data: {}
    }) : r.volume > 0 && 0 === r.volumePrevious && FuiszEvents.trigger(FuiszEvents.ANALYTICS_TRACK, {
      event: "unmute",
      data: {}
    }), t.videoSlot.volume = e, r.volumePrevious = r.volume, this.callEvent_("AdVolumeChange")
  }, s.prototype.getAdVolume = function() {
    return r.volume
  }, s.prototype.resizeAd = function(e, t, i) {
    r.width = e, r.height = t, r.viewMode = i, this.callEvent_("AdSizeChange")
  }, s.prototype.pauseAd = function() {
    r.play && (r.play = !1, t.videoSlot.pause(), this.callEvent_("AdPaused"))
  }, s.prototype.resumeAd = function() {
    r.play || (r.play = !0, t.videoSlot.play(), this.callEvent_("AdPlaying"))
  }, s.prototype.expandAd = function() {}, s.prototype.getAdExpanded = function() {
    return r.expanded
  }, s.prototype.getAdSkippableState = function(e) {
    return r.skippableState
  }, s.prototype.collapseAd = function() {
    r.expanded = !1
  }, s.prototype.skipAd = function() {
    var e = r.skippableState;
    e && (this.callEvent_("AdSkipped"), this.callEvent_("AdStopped"))
  }, s.prototype.getAdRemainingTime = function() {
    return r.remainingTime
  }, s.prototype.adDuration = function() {
    return r.duration
  }, s.prototype.getAdDuration = function() {
    return r.duration
  }, s.prototype.handshakeVersion = function() {
    return "2.0"
  }, s.prototype.subscribe = function(e, t, i) {
    if ("undefined" != typeof i) {
      var o = e.bind(i);
      a[t] = o
    } else a[t] = e
  }, s.prototype.getAdWidth = function() {
    return r.width
  }, s.prototype.getAdHeight = function() {
    return r.height
  }, s.prototype.isPlaying = function() {
    return !1
  }, s.prototype.getAdLinear = function() {
    return r.linear
  }, s.prototype.unsubscribe = function(e) {
    a[e] = null
  }, s.prototype.getAdCompanions = function() {
    return r.companions
  }, s.prototype.getAdIcons = function() {
    return r.icons
  }, s.prototype.overlayOnClick_ = function() {
    this.callEvent_("AdClickThru")
  }, s.prototype.isVPAIDJS = function() {
    return u
  }, s.prototype.getStarted = function() {
    return r.started
  }, window.getVPAIDAd = function() {
    return u = !0, new s
  }, window.LinearAd = s
}();
