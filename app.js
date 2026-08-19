/**
 * PulseAPI — Interactive Engine & Telemetry Simulator
 * High-performance, zero-dependency client script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* ==========================================================================
     1. REGION SWITCHER & DYNAMIC LATENCY HISTOGRAM
     ========================================================================== */
  const regionData = {
    iad1: {
      name: 'IAD (US-East)',
      ingest: '0.04ms',
      jwt: '0.09ms',
      worker: '0.19ms',
      response: '0.06ms',
      p50: '0.12ms',
      p95: '0.28ms',
      p99: '0.34ms',
      distribution: [12, 28, 54, 86, 100, 78, 45, 30, 18, 11, 7, 4, 2, 1]
    },
    fra1: {
      name: 'FRA (EU-Central)',
      ingest: '0.05ms',
      jwt: '0.11ms',
      worker: '0.21ms',
      response: '0.07ms',
      p50: '0.15ms',
      p95: '0.33ms',
      p99: '0.41ms',
      distribution: [8, 22, 48, 76, 92, 88, 58, 38, 24, 15, 9, 6, 3, 2]
    },
    sin1: {
      name: 'SIN (AP-South)',
      ingest: '0.07ms',
      jwt: '0.14ms',
      worker: '0.26ms',
      response: '0.09ms',
      p50: '0.19ms',
      p95: '0.42ms',
      p99: '0.52ms',
      distribution: [6, 18, 38, 64, 82, 95, 72, 50, 34, 22, 14, 8, 5, 3]
    }
  };

  const histContainer = document.getElementById('histogram-bars-container');
  const badgeIngest = document.getElementById('badge-ingest');
  const badgeJwt = document.getElementById('badge-jwt');
  const badgeWorker = document.getElementById('badge-worker');
  const badgeResponse = document.getElementById('badge-response');
  const histP50 = document.getElementById('hist-p50');
  const histP95 = document.getElementById('hist-p95');
  const histP99 = document.getElementById('hist-p99');

  function renderHistogram(regionKey) {
    const data = regionData[regionKey] || regionData.iad1;
    
    // Update metric badges
    if (badgeIngest) badgeIngest.textContent = data.ingest;
    if (badgeJwt) badgeJwt.textContent = data.jwt;
    if (badgeWorker) badgeWorker.textContent = data.worker;
    if (badgeResponse) badgeResponse.textContent = data.response;
    if (histP50) histP50.textContent = data.p50;
    if (histP95) histP95.textContent = data.p95;
    if (histP99) histP99.textContent = data.p99;

    // Render bars
    if (histContainer) {
      histContainer.innerHTML = '';
      data.distribution.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'hist-bar flex-1 rounded-t transition-all duration-300 relative group cursor-pointer';
        bar.style.height = `${val}%`;
        
        // Color coding: p50 (emerald), p95 (amber), p99 (rose)
        if (idx < 5) {
          bar.style.backgroundColor = '#34D399';
        } else if (idx < 9) {
          bar.style.backgroundColor = '#FBBF24';
        } else {
          bar.style.backgroundColor = '#F87171';
        }

        // Hover tooltip
        bar.setAttribute('title', `Bucket ${(idx * 0.04).toFixed(2)}ms: ${val * 1250} traces`);
        histContainer.appendChild(bar);
      });
    }
  }

  // Initial render
  renderHistogram('iad1');

  // Region switcher click events
  document.querySelectorAll('.region-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.region-btn').forEach(b => {
        b.className = 'region-btn px-2.5 py-0.5 rounded text-muted hover:text-white';
      });
      btn.className = 'region-btn active px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium';
      renderHistogram(btn.dataset.region);
    });
  });

  /* ==========================================================================
     2. DETERMINISTIC ONE-CLICK PAYLOAD REPLAYER
     ========================================================================== */
  const bentoReplayBtn = document.getElementById('bento-replay-btn');
  const replayStatusBadge = document.getElementById('replay-status-badge');
  const diffLine2 = document.getElementById('diff-line-2');
  const replaySpinnerIcon = document.getElementById('replay-spinner-icon');
  const replayBtnText = document.getElementById('replay-btn-text');

  let isReplaying = false;
  if (bentoReplayBtn) {
    bentoReplayBtn.addEventListener('click', () => {
      if (isReplaying) return;
      isReplaying = true;

      // Loading state
      if (replaySpinnerIcon) replaySpinnerIcon.classList.add('animate-spin');
      if (replayBtnText) replayBtnText.textContent = 'Dispatching Replay (450ms)...';
      bentoReplayBtn.disabled = true;

      setTimeout(() => {
        // Success state
        if (replaySpinnerIcon) replaySpinnerIcon.classList.remove('animate-spin');
        if (replayBtnText) replayBtnText.textContent = 'Payload Replayed (200 OK)';
        
        if (replayStatusBadge) {
          replayStatusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1';
          replayStatusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span><span>200 OK VERIFIED</span>';
        }

        if (diffLine2) {
          diffLine2.classList.remove('hidden');
        }

        // Reset back after 4 seconds
        setTimeout(() => {
          if (replayBtnText) replayBtnText.textContent = 'Replay to Localhost:3000';
          if (replayStatusBadge) {
            replayStatusBadge.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1';
            replayStatusBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span><span>500 ERROR</span>';
          }
          if (diffLine2) {
            diffLine2.classList.add('hidden');
          }
          bentoReplayBtn.disabled = false;
          isReplaying = false;
        }, 4000);

      }, 450);
    });
  }

  /* ==========================================================================
     3. ZERO-SDK CODE SNIPPETS & COPY UTILITY
     ========================================================================== */
  const sdkSnippets = {
    curl: `<span class="text-purple-400">curl</span> -X POST https://edge.pulseapi.dev/v1/proxy \\
  -H <span class="text-emerald-400">"X-Pulse-Key: pk_live_94f8..."</span> \\
  -H <span class="text-cyan-400">"X-Target: https://api.yoursite.com/stripe"</span> \\
  -d <span class="text-amber-300">'{"event": "charge.succeeded"}'</span>`,
    node: `<span class="text-cyan-400">const</span> res = <span class="text-purple-400">await</span> fetch(<span class="text-emerald-400">"https://edge.pulseapi.dev/v1/proxy"</span>, {
  method: <span class="text-emerald-400">"POST"</span>,
  headers: {
    <span class="text-emerald-400">"X-Pulse-Key"</span>: <span class="text-amber-300">process.env.PULSE_KEY</span>,
    <span class="text-emerald-400">"X-Target"</span>: <span class="text-amber-300">"https://api.yoursite.com/webhooks"</span>
  },
  body: JSON.stringify(payload)
});`,
    python: `<span class="text-purple-400">import</span> requests

res = requests.post(
  <span class="text-emerald-400">"https://edge.pulseapi.dev/v1/proxy"</span>,
  headers={
    <span class="text-emerald-400">"X-Pulse-Key"</span>: os.getenv(<span class="text-amber-300">"PULSE_KEY"</span>),
    <span class="text-emerald-400">"X-Target"</span>: <span class="text-amber-300">"https://api.yoursite.com/webhooks"</span>
  },
  json=payload
)`
  };

  const sdkCodeDisplay = document.getElementById('sdk-code-display');
  document.querySelectorAll('.sdk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sdk-tab').forEach(t => {
        t.className = 'sdk-tab px-2 py-1 rounded text-muted hover:text-white';
      });
      tab.className = 'sdk-tab active px-2 py-1 rounded bg-canvas border border-border-default text-white font-medium';
      const sdk = tab.dataset.sdk;
      if (sdkCodeDisplay) {
        sdkCodeDisplay.innerHTML = `<code>${sdkSnippets[sdk]}</code>`;
      }
    });
  });

  // Copy Snippet Trigger
  const copySnippetBtn = document.getElementById('copy-snippet-btn');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  if (copySnippetBtn && copyBtnLabel) {
    copySnippetBtn.addEventListener('click', () => {
      const plainText = sdkCodeDisplay ? sdkCodeDisplay.innerText : '';
      navigator.clipboard.writeText(plainText).then(() => {
        copyBtnLabel.textContent = 'Copied!';
        copySnippetBtn.classList.add('text-emerald-300');
        setTimeout(() => {
          copyBtnLabel.textContent = 'Copy';
          copySnippetBtn.classList.remove('text-emerald-300');
        }, 2000);
      });
    });
  }

  // Hero CLI Copy Trigger
  const heroCliBox = document.getElementById('hero-cli-box');
  const heroCliText = document.getElementById('hero-cli-text');
  const heroCliCopyBtn = document.getElementById('hero-cli-copy-btn');
  if (heroCliBox && heroCliText) {
    heroCliBox.addEventListener('click', () => {
      navigator.clipboard.writeText(heroCliText.textContent.trim()).then(() => {
        if (heroCliCopyBtn) {
          heroCliCopyBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>';
          if (window.lucide) window.lucide.createIcons();
          setTimeout(() => {
            heroCliCopyBtn.innerHTML = '<i data-lucide="copy" class="w-3.5 h-3.5"></i>';
            if (window.lucide) window.lucide.createIcons();
          }, 2000);
        }
      });
    });
  }

  /* ==========================================================================
     4. INTERACTIVE TERMINAL & COLLAPSIBLE JSON TREE
     ========================================================================== */
  const terminalData = {
    post: {
      endpoint: '/webhooks/stripe',
      sig: 't=16982984,v1=9c4a8f2e91b...',
      json: {
        id: "evt_3M1902Kj81LdF09a",
        object: "event",
        api_version: "2024-06-20",
        created: 1718899200,
        type: "invoice.payment_succeeded",
        data: {
          object: {
            id: "in_1Oc9H2Kj81Ld",
            amount_paid: 4900,
            currency: "usd",
            customer: "cus_Nb8910kL2",
            status: "paid",
            payment_intent: "pi_3M1902Kj81LdF09a"
          }
        },
        livemode: true
      }
    },
    get: {
      endpoint: '/v1/telemetry',
      sig: 'x-pulse-auth=bearer_tok_89a...',
      json: {
        status: "healthy",
        uptime_seconds: 4892019,
        regions_active: 32,
        global_p99_ms: 0.384,
        buffer_utilization: "12.4%",
        probes: ["eBPF_sock", "crypto_simd", "clickhouse_sink"]
      }
    },
    put: {
      endpoint: '/customers/sync',
      sig: 'sha256=d389a01f92e8...',
      json: {
        customer_id: "cus_Nb8910kL2",
        synced_records: 1420,
        idempotency_key: "idem_89a19208bf9",
        latency_breakdown: {
          dns_ms: 0.012,
          tls_handshake_ms: 0.048,
          ttfb_ms: 0.184
        }
      }
    }
  };

  const terminalJsonBody = document.getElementById('terminal-json-body');
  const terminalSigHash = document.getElementById('terminal-sig-hash');

  function syntaxHighlightJson(obj) {
    let json = JSON.stringify(obj, null, 2);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
      let cls = 'json-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      return `<span class="${cls}">${match}</span>`;
    });
  }

  function renderTerminal(method) {
    const data = terminalData[method] || terminalData.post;
    if (terminalSigHash) terminalSigHash.textContent = data.sig;
    if (terminalJsonBody) {
      terminalJsonBody.innerHTML = `<pre class="leading-relaxed"><code>${syntaxHighlightJson(data.json)}</code></pre>`;
    }
  }

  renderTerminal('post');

  document.querySelectorAll('.terminal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.terminal-tab').forEach(t => {
        t.className = 'terminal-tab px-2.5 py-1 rounded text-muted hover:text-white flex items-center gap-1.5';
      });
      tab.className = 'terminal-tab active px-2.5 py-1 rounded bg-canvas border border-border-default text-emerald-400 font-bold flex items-center gap-1.5';
      renderTerminal(tab.dataset.method);
    });
  });

  /* ==========================================================================
     5. INTERACTIVE LIVE SIMULATOR & FLAMEGRAPH DISPATCH
     ========================================================================== */
  const eventPayloads = {
    stripe: {
      headers: [
        'Content-Type: application/json',
        'X-Pulse-Signature: v1=d2938a0f8b76e1a2...',
        'CF-Ray: 89102c918a28-IAD'
      ],
      body: {
        id: "evt_1Oc9H2Kj81Ld",
        object: "event",
        api_version: "2024-06-20",
        data: { amount: 4900, currency: "usd", status: "succeeded" }
      },
      latency: '0.384ms'
    },
    openai: {
      headers: [
        'Content-Type: text/event-stream',
        'X-Pulse-Signature: v1=7c918a209e81b4f2...',
        'OpenAI-Model: gpt-4o-realtime'
      ],
      body: {
        id: "chatcmpl-9K8910aL",
        object: "chat.completion.chunk",
        choices: [{ delta: { content: "Deterministic telemetry validated." }, index: 0 }]
      },
      latency: '0.412ms'
    },
    github: {
      headers: [
        'Content-Type: application/json',
        'X-Hub-Signature-256: sha256=9f8a1290e8b1...',
        'X-GitHub-Event: pull_request'
      ],
      body: {
        action: "closed",
        pull_request: { number: 42, merged: true, title: "feat: eBPF zero-copy ring tap" }
      },
      latency: '0.320ms'
    },
    razorpay: {
      headers: [
        'Content-Type: application/json',
        'X-Razorpay-Signature: d298a0f128e9...',
        'X-Razorpay-Event: order.paid'
      ],
      body: {
        event: "order.paid",
        payload: { order: { id: "order_K8910aL", amount: 25000, status: "paid" } }
      },
      latency: '0.365ms'
    }
  };

  let currentSimEvent = 'stripe';
  const simHeadersDisplay = document.getElementById('sim-headers-display');
  const simBodyDisplay = document.getElementById('sim-body-display');
  const simTotalLatency = document.getElementById('sim-total-latency');
  const dispatchSimBtn = document.getElementById('dispatch-sim-event-btn');
  const kernelTraceLog = document.getElementById('kernel-trace-log');

  function updateSimDisplay(eventKey) {
    currentSimEvent = eventKey;
    const data = eventPayloads[eventKey];
    if (!data) return;

    if (simHeadersDisplay) {
      simHeadersDisplay.innerHTML = data.headers.map(h => {
        const parts = h.split(': ');
        return `<div><span class="text-cyan-400">${parts[0]}:</span> ${parts[1]}</div>`;
      }).join('');
    }

    if (simBodyDisplay) {
      simBodyDisplay.innerHTML = `<code>${JSON.stringify(data.body, null, 2)}</code>`;
    }

    if (simTotalLatency) {
      simTotalLatency.textContent = `Total: ${data.latency}`;
    }
  }

  document.querySelectorAll('.sim-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sim-btn').forEach(b => {
        b.className = 'sim-btn text-xs font-mono px-3 py-1.5 rounded-md bg-canvas border border-border-default text-muted hover:text-white';
      });
      btn.className = 'sim-btn active text-xs font-mono px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium';
      updateSimDisplay(btn.dataset.event);
    });
  });

  if (dispatchSimBtn) {
    dispatchSimBtn.addEventListener('click', () => {
      dispatchSimBtn.disabled = true;
      dispatchSimBtn.innerHTML = '<i data-lucide="refresh-cw" class="w-3.5 h-3.5 animate-spin"></i> Ingesting...';
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        dispatchSimBtn.disabled = false;
        dispatchSimBtn.innerHTML = '<i data-lucide="check" class="w-3.5 h-3.5"></i> Packet Ingested';
        if (window.lucide) window.lucide.createIcons();

        // Append log line to stream
        if (kernelTraceLog) {
          const now = new Date().toISOString().substring(11, 23);
          const logEntry = document.createElement('div');
          logEntry.innerHTML = `[${now}] <span class="text-emerald-400">DISPATCH_ACK:</span> ${currentSimEvent.toUpperCase()} webhook acknowledged in ${eventPayloads[currentSimEvent].latency}`;
          kernelTraceLog.prepend(logEntry);
        }

        setTimeout(() => {
          dispatchSimBtn.innerHTML = '<i data-lucide="send" class="w-3.5 h-3.5"></i> Dispatch Packet';
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      }, 450);
    });
  }

  /* ==========================================================================
     6. COMMAND PALETTE (⌘K / Ctrl+K)
     ========================================================================== */
  const cmdPaletteModal = document.getElementById('cmd-palette-modal');
  const cmdKTriggerBtn = document.getElementById('cmd-k-trigger-btn');
  const openCmdKFooterBtn = document.getElementById('open-cmd-k-footer-btn');
  const cmdPaletteInput = document.getElementById('cmd-palette-input');

  function openCmdPalette() {
    if (cmdPaletteModal) {
      cmdPaletteModal.classList.add('open');
      if (cmdPaletteInput) {
        cmdPaletteInput.value = '';
        document.querySelectorAll('.cmd-item').forEach(item => {
          item.style.display = 'flex';
        });
        cmdPaletteInput.focus();
      }
    }
  }

  function closeCmdPalette() {
    if (cmdPaletteModal) {
      cmdPaletteModal.classList.remove('open');
    }
  }

  // Real-time filtering in Command Palette
  if (cmdPaletteInput) {
    cmdPaletteInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.cmd-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(q)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  if (cmdKTriggerBtn) cmdKTriggerBtn.addEventListener('click', openCmdPalette);
  if (openCmdKFooterBtn) openCmdKFooterBtn.addEventListener('click', openCmdPalette);

  if (cmdPaletteModal) {
    cmdPaletteModal.addEventListener('click', (e) => {
      if (e.target === cmdPaletteModal) {
        closeCmdPalette();
      }
    });
  }

  // Handle Command Palette Actions
  document.querySelectorAll('.cmd-item').forEach(item => {
    item.addEventListener('click', () => {
      const action = item.dataset.action;
      closeCmdPalette();

      if (action === 'goto-playground') {
        document.getElementById('interactive-playground')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-capabilities') {
        document.getElementById('bento-grid')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'goto-matrix') {
        document.getElementById('matrix')?.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'trigger-hud') {
        openEasterEgg();
      } else if (action === 'copy-cli') {
        navigator.clipboard.writeText('curl -sSL https://pulse.sh/edge | sh');
      }
    });
  });

  /* ==========================================================================
     7. EASTER EGG: RETRO CYBERPUNK HUD (BONUS ROUND)
     ========================================================================== */
  const easterEggModal = document.getElementById('easter-egg-modal');
  const easterEggBtn = document.getElementById('easter-egg-btn');
  const mobileHudBtn = document.getElementById('mobile-hud-btn');
  const closeHudBtn = document.getElementById('close-hud-btn');
  const easterEggCloseBtn = document.getElementById('easter-egg-close-btn');

  function openEasterEgg() {
    if (easterEggModal) {
      easterEggModal.classList.add('open');
    }
  }

  function closeEasterEgg() {
    if (easterEggModal) {
      easterEggModal.classList.remove('open');
    }
  }

  if (easterEggBtn) easterEggBtn.addEventListener('click', openEasterEgg);
  if (mobileHudBtn) mobileHudBtn.addEventListener('click', openEasterEgg);
  if (closeHudBtn) closeHudBtn.addEventListener('click', closeEasterEgg);
  if (easterEggCloseBtn) easterEggCloseBtn.addEventListener('click', closeEasterEgg);

  if (easterEggModal) {
    easterEggModal.addEventListener('click', (e) => {
      if (e.target === easterEggModal) closeEasterEgg();
    });
  }

  // Global Keyboard Shortcuts (⌘K, ~, ESC, Konami Code)
  let konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdPaletteModal?.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
      return;
    }

    // Tilde key `~`
    if (e.key === '`' || e.key === '~') {
      if (document.activeElement.tagName !== 'INPUT') {
        e.preventDefault();
        openEasterEgg();
        return;
      }
    }

    // ESC key
    if (e.key === 'Escape') {
      closeCmdPalette();
      closeEasterEgg();
      return;
    }

    // Konami Code Detection
    if (e.key === konamiPattern[konamiIndex] || e.key.toLowerCase() === konamiPattern[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiPattern.length) {
        openEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  /* ==========================================================================
     8. MOBILE MENU TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
