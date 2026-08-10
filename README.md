# The Risk Management Framework (RMF) Process Simplified

An interactive, single-page reference for the NIST Risk Management Framework (RMF) — the seven-step lifecycle defined in [NIST SP 800-37 Rev. 2](https://csrc.nist.gov/pubs/sp/800/37/r2/final) for managing security and privacy risk in federal information systems.

**Live site:** https://themystery.github.io/rmf-process-simplified/

## What's here

- A clickable donut diagram of the seven-step cycle (Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor → back to Prepare)
- A detail card per step covering its purpose, key tasks, primary roles, and expected outputs (SSP, SAR, POA&M, ATO, etc.), each cited to its NIST task IDs

No build step or dependencies — it's plain HTML, CSS, and JavaScript.

**Source:** NIST SP 800-37 Rev. 2 · **Scope:** Federal information systems · **Structure:** 7-step lifecycle, continuous

> The RMF is the process the U.S. federal government — and most contractors who touch federal systems — uses to integrate security, privacy, and supply-chain risk management into the system development lifecycle. It replaced the older Certification & Accreditation model with something closer to a living cycle: seven steps that run in order once, then loop indefinitely as the system, its threats, and its environment change.

## The seven steps

### 1. Prepare
Carry out essential activities at the organization and system level to get ready to manage security and privacy risk — before categorization even starts.

- **Key tasks:** Assign key risk management roles · Establish organizational risk tolerance · Complete an organization-wide risk assessment · Develop the organizational risk management strategy · Identify common controls available for inheritance · Define system-level mission and stakeholder context
- **Primary roles:** Risk Executive, Chief Information Officer, Senior Information Security Officer, System Owner
- **Outputs:** Risk management strategy, Organizational risk assessment, Common control catalog
- **Reference:** SP 800-37 Rev. 2, Task P-1–P-18

### 2. Categorize
Determine the adverse impact to the organization if the system's confidentiality, integrity, or availability were compromised, and set the security category accordingly.

- **Key tasks:** Document the system description and boundary · Register the system with the organization · Categorize the system using FIPS 199 (Low / Moderate / High) · Review and approve the categorization decision
- **Primary roles:** System Owner, Information System Security Officer, Authorizing Official
- **Outputs:** System description, Security categorization (FIPS 199)
- **Reference:** SP 800-37 Rev. 2, Task C-1–C-5 · FIPS 199

### 3. Select
Choose, tailor, and document the set of controls needed to protect the system, sized to its security category.

- **Key tasks:** Select an initial control baseline (Low/Mod/High) · Tailor controls to the system's context and risk · Allocate controls as system-specific, hybrid, or common · Document controls in the Security & Privacy Plan · Develop a continuous monitoring strategy · Review and approve the plans
- **Primary roles:** System Owner, Control Assessor (advisory), Authorizing Official
- **Outputs:** Security Plan (SSP), Privacy Plan, Continuous monitoring strategy
- **Reference:** SP 800-37 Rev. 2, Task S-1–S-6 · SP 800-53B

### 4. Implement
Put the selected controls into operation, then record exactly how each one was built and configured.

- **Key tasks:** Implement controls per the Security & Privacy Plan · Document the as-built implementation of each control · Update the plan with implementation detail
- **Primary roles:** System Owner, Information System Security Engineer
- **Outputs:** Updated Security & Privacy Plan with implementation detail
- **Reference:** SP 800-37 Rev. 2, Task I-1–I-2

### 5. Assess
Have an independent party determine whether the controls are implemented correctly, operating as intended, and producing the desired security outcome.

- **Key tasks:** Select an assessor with appropriate independence · Develop the security assessment plan · Execute the assessment against each control · Produce the assessment report and findings · Remediate deficiencies where feasible before authorization
- **Primary roles:** Independent Assessor, System Owner, Control Assessor
- **Outputs:** Security Assessment Report (SAR), Initial Plan of Action & Milestones (POA&M)
- **Reference:** SP 800-37 Rev. 2, Task A-1–A-6

### 6. Authorize
Give a senior official the risk evidence needed to formally accept — or reject — the risk of operating the system.

- **Key tasks:** Assemble the authorization package (SSP, SAR, POA&M) · Determine the risk to organizational operations and assets · Issue an authorization decision and its conditions · Communicate risk determination to stakeholders
- **Primary roles:** Authorizing Official, Senior Information Security Officer
- **Outputs:** Authorization decision (ATO, denial, or interim), Authorization package
- **Reference:** SP 800-37 Rev. 2, Task R-1–R-5

### 7. Monitor
Track control effectiveness, system changes, and the threat environment on an ongoing basis — keeping the authorization decision current rather than letting it go stale.

- **Key tasks:** Monitor system and environment for changes · Conduct ongoing control assessments · Respond to newly identified risk · Update the POA&M and risk posture · Report security and privacy status to the AO · Support ongoing / continuous authorization
- **Primary roles:** System Owner, Information System Security Officer, Authorizing Official
- **Outputs:** Continuous monitoring reports, Updated risk posture — feeds back into Prepare
- **Reference:** SP 800-37 Rev. 2, Task M-1–M-6

Step 7 (Monitor) loops back to Step 1 (Prepare), and the cycle repeats continuously as the system, its threats, and its environment change.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve .
```

## Structure

```
index.html   — page markup
styles.css   — layout, type, and light/dark theming
script.js    — step data, the SVG cycle diagram, and interaction wiring
```

## Disclaimer

This is an independently written educational reference, not an official government publication.
