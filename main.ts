import { serve } from "https://deno.land/std@0.145.0/http/server.ts";

let cur_ticks = 0;

setInterval(() => {
  cur_ticks++
}, 1000);

function get_headers(req: Request, indent = "  ") {
  let headers: string[] = []
  for (let [k, v] of req.headers.entries()) {
    headers.push(`${k}: ${v}`)
  }
  return headers.map(s => indent + s).join("\n")
}

function get_env(indent = "  ") {
  let env: string[] = []
  for (let [k, v] of Object.entries(Deno.env.toObject())) {
    env.push(`${k}: ${v}`)
  }
  return env.map(s => indent + s).join("\n")
}

serve(req => {
  let dir = Deno.cwd()
  let content = [
    `headers:\n${get_headers(req)}`,
    `env:\n${get_env()}`,
    `Deno.cwd: ${dir}`,
    `cur_ticks: ${cur_ticks}`
  ].join("\n");

  return new Response(content, {
    headers: { "content-type": "text/plain" },
  });
});
