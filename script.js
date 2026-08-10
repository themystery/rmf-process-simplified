const steps = [
  {
    name: "Prepare",
    purpose: "Carry out essential activities at the organization and system level to get ready to manage security and privacy risk — before categorization even starts.",
    tasks: [
      "Assign key risk management roles",
      "Establish organizational risk tolerance",
      "Complete an organization-wide risk assessment",
      "Develop the organizational risk management strategy",
      "Identify common controls available for inheritance",
      "Define system-level mission and stakeholder context"
    ],
    roles: ["Risk Executive", "Chief Information Officer", "Senior Information Security Officer", "System Owner"],
    outputs: ["Risk management strategy", "Organizational risk assessment", "Common control catalog"],
    citation: "SP 800-37 Rev. 2, Task P-1–P-18"
  },
  {
    name: "Categorize",
    purpose: "Determine the adverse impact to the organization if the system's confidentiality, integrity, or availability were compromised, and set the security category accordingly.",
    tasks: [
      "Document the system description and boundary",
      "Register the system with the organization",
      "Categorize the system using FIPS 199 (Low / Moderate / High)",
      "Review and approve the categorization decision"
    ],
    roles: ["System Owner", "Information System Security Officer", "Authorizing Official"],
    outputs: ["System description", "Security categorization (FIPS 199)"],
    citation: "SP 800-37 Rev. 2, Task C-1–C-5 · FIPS 199"
  },
  {
    name: "Select",
    purpose: "Choose, tailor, and document the set of controls needed to protect the system, sized to its security category.",
    tasks: [
      "Select an initial control baseline (Low/Mod/High)",
      "Tailor controls to the system's context and risk",
      "Allocate controls as system-specific, hybrid, or common",
      "Document controls in the Security &amp; Privacy Plan",
      "Develop a continuous monitoring strategy",
      "Review and approve the plans"
    ],
    roles: ["System Owner", "Control Assessor (advisory)", "Authorizing Official"],
    outputs: ["Security Plan (SSP)", "Privacy Plan", "Continuous monitoring strategy"],
    citation: "SP 800-37 Rev. 2, Task S-1–S-6 · SP 800-53B"
  },
  {
    name: "Implement",
    purpose: "Put the selected controls into operation, then record exactly how each one was built and configured.",
    tasks: [
      "Implement controls per the Security &amp; Privacy Plan",
      "Document the as-built implementation of each control",
      "Update the plan with implementation detail"
    ],
    roles: ["System Owner", "Information System Security Engineer"],
    outputs: ["Updated Security &amp; Privacy Plan with implementation detail"],
    citation: "SP 800-37 Rev. 2, Task I-1–I-2"
  },
  {
    name: "Assess",
    purpose: "Have an independent party determine whether the controls are implemented correctly, operating as intended, and producing the desired security outcome.",
    tasks: [
      "Select an assessor with appropriate independence",
      "Develop the security assessment plan",
      "Execute the assessment against each control",
      "Produce the assessment report and findings",
      "Remediate deficiencies where feasible before authorization"
    ],
    roles: ["Independent Assessor", "System Owner", "Control Assessor"],
    outputs: ["Security Assessment Report (SAR)", "Initial Plan of Action &amp; Milestones (POA&amp;M)"],
    citation: "SP 800-37 Rev. 2, Task A-1–A-6"
  },
  {
    name: "Authorize",
    purpose: "Give a senior official the risk evidence needed to formally accept — or reject — the risk of operating the system.",
    tasks: [
      "Assemble the authorization package (SSP, SAR, POA&amp;M)",
      "Determine the risk to organizational operations and assets",
      "Issue an authorization decision and its conditions",
      "Communicate risk determination to stakeholders"
    ],
    roles: ["Authorizing Official", "Senior Information Security Officer"],
    outputs: ["Authorization decision (ATO, denial, or interim)", "Authorization package"],
    citation: "SP 800-37 Rev. 2, Task R-1–R-5"
  },
  {
    name: "Monitor",
    purpose: "Track control effectiveness, system changes, and the threat environment on an ongoing basis — keeping the authorization decision current rather than letting it go stale.",
    tasks: [
      "Monitor system and environment for changes",
      "Conduct ongoing control assessments",
      "Respond to newly identified risk",
      "Update the POA&amp;M and risk posture",
      "Report security and privacy status to the AO",
      "Support ongoing / continuous authorization"
    ],
    roles: ["System Owner", "Information System Security Officer", "Authorizing Official"],
    outputs: ["Continuous monitoring reports", "Updated risk posture — feeds back into Prepare"],
    citation: "SP 800-37 Rev. 2, Task M-1–M-6"
  }
];

// ---- Build the donut cycle diagram ----
const svg = document.getElementById("cycleSvg");
const cx = 200, cy = 200, rOuter = 178, rInner = 108;
const gapDeg = 3;
const n = steps.length;
const sweep = 360 / n;

function polar(r, angleDeg) {
  const a = (angleDeg - 90) * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}
function segPath(startDeg, endDeg) {
  const [x1, y1] = polar(rOuter, startDeg);
  const [x2, y2] = polar(rOuter, endDeg);
  const [x3, y3] = polar(rInner, endDeg);
  const [x4, y4] = polar(rInner, startDeg);
  const large = (endDeg - startDeg) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
}

const svgns = "http://www.w3.org/2000/svg";
let active = 0;

steps.forEach((step, i) => {
  const start = i * sweep + gapDeg / 2;
  const end = (i + 1) * sweep - gapDeg / 2;
  const mid = (start + end) / 2;

  const path = document.createElementNS(svgns, "path");
  path.setAttribute("d", segPath(start, end));
  path.setAttribute("class", "seg" + (i === 0 ? " active" : ""));
  path.setAttribute("tabindex", "0");
  path.setAttribute("role", "button");
  path.setAttribute("aria-label", `Step ${i + 1}: ${step.name}`);
  path.dataset.index = i;
  path.addEventListener("click", () => setActive(i));
  path.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(i); } });
  svg.appendChild(path);

  const [lx, ly] = polar((rOuter + rInner) / 2, mid);
  const numLabel = document.createElementNS(svgns, "text");
  numLabel.setAttribute("x", lx);
  numLabel.setAttribute("y", ly - 4);
  numLabel.setAttribute("class", "seg-label" + (i === 0 ? " active" : ""));
  numLabel.textContent = "0" + (i + 1);
  numLabel.style.pointerEvents = "none";
  svg.appendChild(numLabel);

  const nameLabel = document.createElementNS(svgns, "text");
  nameLabel.setAttribute("x", lx);
  nameLabel.setAttribute("y", ly + 10);
  nameLabel.setAttribute("class", "seg-label" + (i === 0 ? " active" : ""));
  nameLabel.textContent = step.name;
  nameLabel.style.pointerEvents = "none";
  svg.appendChild(nameLabel);
});

// loop-back arrow from Monitor wedge toward Prepare wedge, inside the inner ring
const loopStart = polar(rInner - 14, n * sweep - gapDeg);
const loopMid = polar(rInner - 26, n * sweep + sweep / 2);
const loopEnd = polar(rInner - 14, sweep + gapDeg);
const loopPath = document.createElementNS(svgns, "path");
loopPath.setAttribute("d", `M ${loopStart[0]} ${loopStart[1]} Q ${loopMid[0]} ${loopMid[1]} ${loopEnd[0]} ${loopEnd[1]}`);
loopPath.setAttribute("class", "loop-arrow");
loopPath.setAttribute("marker-end", "url(#arrowhead)");
svg.insertBefore(loopPath, svg.firstChild);

const defs = document.createElementNS(svgns, "defs");
defs.innerHTML = `<marker id="arrowhead" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
  <path d="M0,0 L6,3 L0,6 Z" fill="var(--steel)" />
</marker>`;
svg.insertBefore(defs, svg.firstChild);

const centerNum = document.createElementNS(svgns, "text");
centerNum.setAttribute("x", cx); centerNum.setAttribute("y", cy - 4);
centerNum.setAttribute("class", "cycle-center-num");
centerNum.id = "centerNum";
centerNum.textContent = "01";
svg.appendChild(centerNum);

const centerLbl = document.createElementNS(svgns, "text");
centerLbl.setAttribute("x", cx); centerLbl.setAttribute("y", cy + 18);
centerLbl.setAttribute("class", "cycle-center-lbl");
centerLbl.id = "centerLbl";
centerLbl.textContent = "of 7 steps";
svg.appendChild(centerLbl);

// ---- Build step cards ----
const list = document.getElementById("stepsList");
steps.forEach((step, i) => {
  const card = document.createElement("article");
  card.className = "step-card" + (i === 0 ? " active" : "");
  card.id = "step-" + i;
  card.innerHTML = `
    <div class="step-num-col">
      <div class="step-num mono">0${i + 1}</div>
      <div class="step-order">${i === n - 1 ? "LOOPS TO 01" : "NEXT 0" + (i + 2)}</div>
    </div>
    <div class="step-body">
      <h3>${step.name}</h3>
      <p class="step-purpose">${step.purpose}</p>
      <div class="step-grid">
        <div>
          <h4>Key tasks</h4>
          <ul>${step.tasks.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Primary roles</h4>
          <div class="pill-row">${step.roles.map(r => `<span class="pill">${r}</span>`).join("")}</div>
          <h4 style="margin-top:1rem">Outputs</h4>
          <div class="pill-row">${step.outputs.map(o => `<span class="pill">${o}</span>`).join("")}</div>
        </div>
      </div>
      <p class="step-citation"><b>Reference —</b> ${step.citation}</p>
    </div>
  `;
  card.addEventListener("click", () => setActive(i, false));
  list.appendChild(card);
});

function setActive(i, scroll = true) {
  active = i;
  document.querySelectorAll(".seg").forEach((el, idx) => el.classList.toggle("active", idx === i));
  document.querySelectorAll(".seg-label").forEach((el, idx) => {
    const segIdx = Math.floor(idx / 2);
    el.classList.toggle("active", segIdx === i);
  });
  document.querySelectorAll(".step-card").forEach((el, idx) => el.classList.toggle("active", idx === i));

  document.getElementById("readoutEyebrow").textContent = `STEP ${i + 1} OF ${n}`;
  document.getElementById("readoutName").textContent = steps[i].name;
  document.getElementById("readoutPurpose").textContent = steps[i].purpose;
  document.getElementById("centerNum").textContent = "0" + (i + 1);

  if (scroll) document.getElementById("step-" + i).scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
}
