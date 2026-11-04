/* @ds-bundle: {"format":4,"namespace":"TripDS","components":[{"name":"Icon"},{"name":"Button"},{"name":"StatusPill"},{"name":"TripTag"},{"name":"VehicleHeader"},{"name":"RouteColumns"},{"name":"RouteStops"},{"name":"OtpPanel"},{"name":"DriverRow"},{"name":"NumberPlate"},{"name":"StatusStepper"},{"name":"StatusTimeline"},{"name":"FareSummary"},{"name":"BookingIdCard"},{"name":"ResultHero"},{"name":"InfoNote"},{"name":"TripCard"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  /* Status → accent + tint tokens */
  var STATUS = {
    pending:   { label: 'Pending',   icon: 'M8 4.6V8l2.4 1.6', accent: 'var(--status-pending)', fill: 'var(--status-pending-strong)', mark: 'var(--status-pending-strong)', tint: 'var(--status-pending-tint)' },
    unpaid:    { label: 'Unpaid',    icon: 'M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2', accent: 'var(--status-negative-ink)', fill: 'var(--status-negative)', mark: 'var(--status-negative)', tint: 'var(--status-negative-tint)' },
    cancelled: { label: 'Cancelled', icon: 'M5.4 5.4l5.2 5.2M10.6 5.4l-5.2 5.2', accent: 'var(--status-negative-ink)', fill: 'var(--status-negative)', mark: 'var(--status-negative)', tint: 'var(--status-negative-tint)' },
    confirmed: { label: 'Confirmed', icon: 'M4.8 8.2l2.1 2.1 4.3-4.4', accent: 'var(--status-success)', fill: 'var(--status-success-strong)', mark: 'var(--status-success-strong)', tint: 'var(--status-success-tint)' },
    onTrip:    { label: 'On Trip',   icon: 'M4.6 8h6.4M8.6 5.6L11 8l-2.4 2.4', accent: 'var(--status-ontrip)', fill: 'var(--status-ontrip)', mark: 'var(--status-ontrip)', tint: 'var(--status-ontrip-tint)' },
    completed: { label: 'Completed', icon: 'M4.8 8.2l2.1 2.1 4.3-4.4', accent: 'var(--status-success)', fill: 'var(--status-success-strong)', mark: 'var(--status-success-strong)', tint: 'var(--status-success-tint)' }
  };
  function statusVars(status) {
    var s = STATUS[status] || STATUS.confirmed;
    return { '--tb-accent': s.accent, '--tb-fill': s.fill, '--tb-mark': s.mark, '--tb-tint': s.tint };
  }

  /* Icons: 24px grid, stroke-based */
  var PATHS = {
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    carCheck: '<path d="M5 17v2M19 17v2"/><path d="M4 17h16v-4l-2-5H6l-2 5z"/><path d="M7.5 14h.01M16.5 14h.01"/><path d="M9.5 4.5l1.8 1.8 3.2-3.3"/>',
    car: '<path d="M3 16v-3l2-4.5A2 2 0 016.8 7h8.4a2 2 0 011.6.8L19.5 11H21v5h-2"/><path d="M9 16h6"/><circle cx="7" cy="16.5" r="1.8"/><circle cx="17" cy="16.5" r="1.8"/><path d="M11 7v4M4.5 11h15"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    navigate: '<path d="M3 11l18-8-8 18-2-8-8-2z"/>',
    pin: '<path d="M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z"/>',
    chat: '<path d="M21 12a8 8 0 01-11.6 7.1L4 20.5l1.4-4.9A8 8 0 1121 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    share: '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.7l7.4-4.3M8.3 13.3l7.4 4.3"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
    unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 017.6-1.7"/>',
    editCalendar: '<path d="M20 11V6a2 2 0 00-2-2H6a2 2 0 00-2 2v13a2 2 0 002 2h5"/><path d="M16 2v4M8 2v4M4 10h16"/><path d="M18.4 14.6a1.4 1.4 0 012 2L16 21l-2.6.6.6-2.6z"/>',
    download: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/>',
    chevronDown: '<path d="M6 9l6 6 6-6"/>',
    chevronRight: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    retry: '<path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 5v6h-6"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 014.6 1.3c0 1.7-2.1 2-2.1 3.2"/><path d="M12 17h.01"/>',
    support: '<path d="M4 14v-2a8 8 0 0116 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>'
  };
  function Icon(props) {
    var size = props.size || 16;
    return h('svg', {
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      strokeWidth: props.strokeWidth || 2, strokeLinecap: 'round', strokeLinejoin: 'round',
      'aria-hidden': props.label ? undefined : 'true', role: props.label ? 'img' : undefined,
      'aria-label': props.label, className: props.className,
      dangerouslySetInnerHTML: { __html: PATHS[props.name] || '' }
    });
  }
  function FilledPin(props) {
    return h('svg', { width: props.size || 16, height: props.size || 16, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true', className: props.className },
      h('path', { d: 'M12 22s7-6.3 7-12a7 7 0 10-14 0c0 5.7 7 12 7 12z' }),
      h('circle', { cx: 12, cy: 10, r: 2.6, fill: 'var(--surface)' }));
  }

  function Button(props) {
    var variant = props.variant || 'primary', size = props.size || 'md';
    var rest = Object.assign({}, props);
    ['variant', 'size', 'icon', 'iconEnd', 'fullWidth', 'children', 'className', 'href'].forEach(function (k) { delete rest[k]; });
    var kids = [
      props.icon ? h(Icon, { key: 'i', name: props.icon, size: size === 'lg' ? 17 : 16, strokeWidth: 2.2 }) : null,
      h('span', { key: 'l' }, props.children),
      props.iconEnd ? h(Icon, { key: 'e', name: props.iconEnd, size: 14, strokeWidth: 2.6 }) : null
    ];
    var cls = cx('tb-btn', 'tb-btn-' + variant, size === 'lg' && 'tb-btn-lg', props.fullWidth && 'tb-btn-full', props.className);
    if (props.href) return h('a', Object.assign({ href: props.href, className: cls }, rest), kids);
    return h('button', Object.assign({ type: 'button', className: cls }, rest), kids);
  }

  function StatusPill(props) {
    var s = STATUS[props.status] || STATUS.confirmed;
    return h('span', { className: 'tb-pill', style: statusVars(props.status) },
      h('svg', { width: 16, height: 16, viewBox: '0 0 16 16', 'aria-hidden': 'true', className: 'tb-pill-icon' },
        h('circle', { cx: 8, cy: 8, r: 8, fill: 'var(--tb-mark)' }),
        h('path', { d: s.icon, fill: 'none', stroke: '#FFFFFF', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' })),
      h('span', null, props.children || s.label));
  }

  function TripTag(props) {
    if (!props.label) return h('span', { className: 'tb-tag' }, props.children);
    return h('div', { className: 'tb-tagline' }, h('span', { className: 'tb-tag' }, props.children), h('span', null, props.label));
  }

  function VehicleHeader(props) {
    return h('div', { className: 'tb-vehicle' },
      h('div', { className: 'tb-thumb' }, props.imageSrc ? h('img', { src: props.imageSrc, alt: props.imageAlt || props.type }) : h(Icon, { name: 'car', size: 28 })),
      h('div', { className: 'tb-vehicle-text' },
        h('div', { className: 'tb-vehicle-type' }, props.type),
        props.model ? h('div', { className: 'tb-vehicle-model' }, props.model) : null),
      props.trailing || null);
  }

  function Loc(icon, label, stop) {
    return h('div', { className: 'tb-loc' },
      h('div', { className: 'tb-loc-label' }, h(Icon, { name: icon, size: 14, strokeWidth: 2.2 }), h('span', null, label)),
      h('div', { className: 'tb-loc-addr' }, stop.address),
      stop.time ? h('div', { className: 'tb-loc-time' }, stop.time) : null);
  }
  function RouteColumns(props) {
    return h('div', { className: 'tb-route-cols' }, Loc('navigate', 'Pickup', props.pickup), h('i', { 'aria-hidden': 'true' }), Loc('pin', 'Drop', props.drop));
  }

  function RouteStops(props) {
    return h('div', { className: 'tb-stops' },
      h('div', { className: 'tb-stops-rail', 'aria-hidden': 'true' },
        h('span', { className: 'tb-stops-start' }), h('span', { className: 'tb-stops-line' }), h(FilledPin, { className: 'tb-stops-pin' })),
      h('div', { className: 'tb-stops-list' },
        h('div', { className: 'tb-stop' }, h('div', { className: 'tb-stop-meta' }, 'Pickup' + (props.pickup.time ? ' · ' + props.pickup.time : '')), h('div', { className: 'tb-stop-addr' }, props.pickup.address)),
        h('div', { className: 'tb-stop' }, h('div', { className: 'tb-stop-meta' }, 'Drop' + (props.drop.time ? ' · ' + props.drop.time : '')), h('div', { className: 'tb-stop-addr' }, props.drop.address))));
  }

  function OtpBlock(icon, title, hint, code) {
    code = String(code || '');
    return h('div', { className: 'tb-otp-block' },
      h('div', { className: 'tb-otp-title' }, h(Icon, { name: icon, size: 14, strokeWidth: 2.2 }), h('span', null, title)),
      h('div', { className: 'tb-otp-hint' }, hint),
      h('div', { className: 'tb-otp-digits', 'aria-label': title + ' ' + code.split('').join(' ') },
        code.split('').map(function (d, i) { return h('span', { key: i, 'aria-hidden': 'true' }, d); })));
  }
  function OtpPanel(props) {
    var both = props.boarding && props.deboarding;
    return h('section', { className: cx('tb-otp', !both && 'is-single'), 'aria-label': 'Trip OTPs' },
      props.boarding ? OtpBlock('lock', 'Boarding OTP', props.boardingHint || 'Share with driver at pickup', props.boarding) : null,
      both ? h('i', { 'aria-hidden': 'true' }) : null,
      props.deboarding ? OtpBlock('unlock', 'Deboarding OTP', props.deboardingHint || 'Share with driver at drop', props.deboarding) : null);
  }

  var ACTIONS = { call: ['phone', 'Call'], chat: ['chat', 'Chat'], share: ['share', 'Share trip'] };
  function DriverRow(props) {
    var actions = props.actions || ['call', 'chat', 'share'];
    var handlers = { call: props.onCall, chat: props.onChat, share: props.onShare };
    return h('div', { className: 'tb-driver' },
      h('div', { className: 'tb-driver-text' },
        h('div', { className: 'tb-driver-label' }, props.label || 'Your driver'),
        h('div', { className: 'tb-driver-name' }, props.name),
        props.phone ? h('div', { className: 'tb-driver-phone' }, props.phone) : null),
      h('div', { className: 'tb-actions' }, actions.map(function (a) {
        var def = ACTIONS[a];
        return h('button', { key: a, type: 'button', className: 'tb-round', onClick: handlers[a], 'aria-label': def[1] + (a === 'share' ? '' : ' driver') },
          h('span', null, h(Icon, { name: def[0], size: 18 })), h('span', { 'aria-hidden': 'true' }, def[1]));
      })));
  }

  function NumberPlate(props) { return h('span', { className: 'tb-plate' }, props.children); }

  var STEPPER = [['Pending', 'clock'], ['Confirmed', 'carCheck'], ['On Trip', 'car'], ['Completed', 'check']];
  var STEP_INDEX = { pending: 0, confirmed: 1, onTrip: 2, completed: 3 };
  function StatusStepper(props) {
    var cur = STEP_INDEX[props.status] != null ? STEP_INDEX[props.status] : 1;
    var fill = cur >= 3 ? 75 : cur * 25 + 6;
    return h('div', { className: 'tb-stepper', style: statusVars(props.status), role: 'group', 'aria-label': 'Trip status: ' + STEPPER[cur][0] },
      h('div', { className: 'tb-stepper-track', 'aria-hidden': 'true' }),
      h('div', { className: 'tb-stepper-fill', style: { width: fill + '%' }, 'aria-hidden': 'true' }),
      STEPPER.map(function (s, i) {
        return h('div', { key: i, className: cx('tb-step', i <= cur && 'is-reached', i === cur && cur < 3 && 'is-current'), 'aria-current': i === cur ? 'step' : undefined },
          h('span', { className: 'tb-step-dot' }, h(Icon, { name: s[1], size: i === 2 ? 20 : 18, strokeWidth: 2.1 })),
          h('span', { className: 'tb-step-label' }, s[0]));
      }));
  }

  var DEFAULT_STEPS = [
    { label: 'Booking confirmed', done: '8 Oct, 4:42 PM', now: 'Confirming your booking…', todo: 'Usually within 15 min' },
    { label: 'Driver assigned', done: 'Rajesh K. | DL 01 AB 1234', now: 'Assigning a driver…', todo: 'Details shared before pickup' },
    { label: 'Driver on the way', done: 'Reached pickup · 9:58 AM', now: 'Live location | ETA 12 min', todo: 'Live location once driver starts' },
    { label: 'Trip started - share OTP', done: 'Started · 10 Oct, 10:04 AM', now: 'Share OTP: 4827', todo: 'OTP: 4827' },
    { label: 'Trip completed & rate', done: '10 Oct, 6:21 PM · Rate your trip', now: 'Share drop OTP: 6153', todo: 'Expected · 10 Oct, 6:30 PM' }
  ];
  function progressStatus(p) { return p === 0 ? 'pending' : p <= 3 ? 'confirmed' : p === 4 ? 'onTrip' : 'completed'; }
  function StatusTimeline(props) {
    var steps = props.steps || DEFAULT_STEPS;
    var p = Math.max(0, Math.min(steps.length, props.progress == null ? 2 : props.progress));
    var collapsible = props.collapsible !== false;
    var st = useState(!!props.defaultExpanded || !collapsible);
    var open = st[0], setOpen = st[1];
    var focus = Math.min(p, steps.length - 1);
    var status = props.status || progressStatus(p);
    var visible = open ? steps.map(function (s, i) { return i; }) : [focus];
    return h('div', { style: statusVars(status) },
      collapsible ? h('button', { type: 'button', className: 'tb-toggle', 'aria-expanded': String(open), onClick: function () { setOpen(!open); } },
        h('span', { className: 'tb-pips', 'aria-hidden': 'true' }, steps.map(function (s, i) { return h('span', { key: i, className: i < p ? 'is-done' : i === p ? 'is-now' : '' }); })),
        h('span', { className: 'tb-toggle-count' }, 'Step ' + Math.min(p + 1, steps.length) + ' of ' + steps.length),
        h('span', { className: 'tb-toggle-label' }, open ? 'Hide updates' : 'View all updates'),
        h(Icon, { name: 'chevronDown', size: 16, strokeWidth: 2.4 })) : null,
      h('ol', { className: 'tb-timeline' }, visible.map(function (i, n) {
        var s = steps[i], state = i < p ? 'done' : i === p ? 'now' : 'todo';
        var last = n === visible.length - 1;
        return h('li', { key: i, className: cx('tb-tl-step', 'is-' + state, last && 'is-last'), 'aria-current': state === 'now' ? 'step' : undefined },
          h('div', { className: 'tb-tl-rail' },
            h('span', { className: 'tb-tl-dot' }, state === 'done' ? h(Icon, { name: 'check', size: 12, strokeWidth: 3.4 }) : null),
            h('span', { className: 'tb-tl-line', 'aria-hidden': 'true' })),
          h('div', { className: 'tb-tl-body' },
            h('div', { className: 'tb-tl-title' }, s.label),
            h('div', { className: 'tb-tl-sub' }, state === 'done' ? s.done : state === 'now' ? s.now : s.todo)));
      })));
  }

  function FareSummary(props) {
    return h('section', { className: 'tb-card tb-card-pad', 'aria-label': 'Fare' },
      props.title ? h('h2', { className: 'tb-section-title' }, props.title) : null,
      (props.lines || []).map(function (l, i) { return h('div', { key: i, className: 'tb-fare-line' }, h('span', null, l.label), h('span', null, l.amount)); }),
      h('div', { className: 'tb-divider', style: { margin: 0 } }),
      h('div', { className: 'tb-fare-total' }, h('span', null, props.totalLabel || 'Total paid'), h('span', null, props.total)),
      props.note ? h('div', { className: 'tb-fare-note' }, props.note) : null);
  }

  function BookingIdCard(props) {
    var st = useState(false), copied = st[0], setCopied = st[1];
    function copy() {
      try { navigator.clipboard.writeText(props.id).then(function () { setCopied(true); }, function () {}); } catch (e) {}
      if (props.onCopy) props.onCopy(props.id);
    }
    return h('section', { className: 'tb-bid', 'aria-label': 'Booking ID' },
      h('div', { className: 'tb-bid-text' }, h('div', { className: 'tb-bid-label' }, 'Booking ID'), h('div', { className: 'tb-bid-value' }, props.id)),
      h('button', { type: 'button', className: 'tb-copy', onClick: copy, 'aria-label': 'Copy booking ID' }, h(Icon, { name: copied ? 'check' : 'copy', size: 14, strokeWidth: 2.2 }), h('span', null, copied ? 'Copied' : 'Copy')));
  }

  var CONFETTI = '<circle cx="84" cy="8" r="3.5" fill="#A964F7"/><circle cx="30" cy="54" r="5" fill="#FFB749"/><circle cx="142" cy="46" r="4.5" fill="#6DAAFB"/><circle cx="50" cy="104" r="3.5" fill="#77B71C"/><path d="M58 22c3-2 1-6 4-8" fill="none" stroke="#FC7F79" stroke-width="2.4" stroke-linecap="round"/><path d="M120 22c4-6 12-2 8 3s-9-1-3-6" fill="none" stroke="#FC823A" stroke-width="2.4" stroke-linecap="round"/><path d="M36 86c3 0 3 4 6 4s3-4 6-4" fill="none" stroke="#2B64E5" stroke-width="2.4" stroke-linecap="round"/><path d="M146 70l12-3-9 9z" fill="#A6D467"/><path d="M126 100a6 6 0 0 0 10 0" fill="none" stroke="#2B64E5" stroke-width="3.5" stroke-linecap="round"/>';
  function ResultIcon(props) {
    var ok = props.tone !== 'cancelled';
    var k = ok ? 'success' : 'negative';
    var cx = ok ? 84 : 64, w = ok ? 168 : 128;
    var mark = ok ? '<path d="M72 64.5l8 8 16-16.5" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'
                  : '<path d="M55 55l18 18M73 55L55 73" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>';
    var inner = '<circle cx="' + cx + '" cy="64" r="46" fill="var(--status-' + k + '-halo)"/>' +
      '<circle cx="' + cx + '" cy="64" r="36" fill="var(--status-' + k + '-ring)"/>' +
      '<circle cx="' + cx + '" cy="64" r="28" fill="var(--status-' + k + '-strong)"/>' + mark + (ok && props.confetti !== false ? CONFETTI : '');
    var scale = (props.size || 132) / 128;
    return h('svg', { className: 'tb-hero-svg', width: Math.round(w * scale), height: Math.round(128 * scale), viewBox: '0 0 ' + w + ' 128', 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: inner } });
  }
  function ResultHero(props) {
    var tone = props.tone || 'success';
    return h('section', { className: 'tb-hero' },
      h(ResultIcon, { tone: tone, confetti: props.confetti, size: props.iconSize }),
      h('h1', { className: 'tb-hero-title' }, props.title),
      props.message ? h('p', { className: 'tb-hero-msg' }, props.message) : null,
      props.amount ? h('div', { className: 'tb-hero-amount' }, props.amount) : null,
      props.meta ? h('div', { className: 'tb-hero-meta' }, props.meta) : null);
  }

  function InfoNote(props) {
    return h('div', { className: 'tb-note', role: 'note' }, h(Icon, { name: 'info', size: 18 }), h('div', null, props.children));
  }

  function TripCard(props) {
    var status = props.status || 'confirmed';
    return h('article', { className: 'tb tb-card', style: { width: props.width || 360 } },
      h(VehicleHeader, { imageSrc: props.imageSrc, type: props.vehicleType || 'Sedan', model: props.vehicleModel || 'Suzuki Dzire or similar', trailing: h(StatusPill, { status: status }) }),
      props.showStepper === false ? null : h(StatusStepper, { status: status }),
      h('div', { style: { padding: '12px 16px' } }, h(TripTag, { label: props.tripType || 'Outstation trip' }, props.tripTag || 'One way')),
      h('div', { className: 'tb-divider' }),
      h(RouteColumns, { pickup: props.pickup, drop: props.drop }),
      props.driver ? h('div', { className: 'tb-divider' }) : null,
      props.driver ? h('div', { style: { padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 12 } },
        h(DriverRow, props.driver),
        props.otp ? h(OtpPanel, props.otp) : null) : null,
      h('div', { className: 'tb-btn-pair' },
        h(Button, { variant: 'outline', icon: 'editCalendar', onClick: props.onManage }, 'Manage Booking'),
        h(Button, { variant: 'soft', icon: 'download', onClick: props.onInvoice }, 'Download Invoice')),
      h('footer', { className: 'tb-card-footer' }, 'ID: ', h('b', null, props.bookingId), '  •  Paid: ', h('strong', null, props.paid)));
  }

  window.TripDS = Object.assign(window.TripDS || {}, {
    Icon: Icon, Button: Button, StatusPill: StatusPill, TripTag: TripTag, VehicleHeader: VehicleHeader,
    RouteColumns: RouteColumns, RouteStops: RouteStops, OtpPanel: OtpPanel, DriverRow: DriverRow, NumberPlate: NumberPlate,
    StatusStepper: StatusStepper, StatusTimeline: StatusTimeline, FareSummary: FareSummary, BookingIdCard: BookingIdCard,
    ResultHero: ResultHero, InfoNote: InfoNote, TripCard: TripCard, ICON_NAMES: Object.keys(PATHS)
  });
})();
