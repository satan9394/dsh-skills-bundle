# Plugin entry — registers the plugin row's capabilities.

export const name = 'template'

export function apply(ctx) {
  // Host-side plugin entry. `ctx` is the Cordis context:
  //   ctx.tools.register(...)   — register model-facing tools
  //   ctx.skills.register(...)  — register skills (or mount a skills/ provider)
  //   ctx.web / ctx.settings    — web seams (see docs/subsystems)
  ctx.logger?.(`[${name}] plugin loaded`)
}
