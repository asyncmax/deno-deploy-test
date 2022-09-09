import { serve } from "https://deno.land/std@0.145.0/http/server.ts";

let cur_ticks = 0;

setInterval(() => {
  cur_ticks++
}, 1000);

serve(req => {
  let dir = Deno.cwd()
  let headers: string[] = []

  for (let [k, v] of req.headers.entries()) {
    headers.push(`${k}: ${v}`)
  }

  let content = [
    `headers:\n${headers.map(s => "  " + s).join("\n")}`,
    `Deno.cwd: ${dir}`,
    `cur_ticks: ${cur_ticks}`
  ].join("\n");

  return new Response(content, {
    headers: { "content-type": "text/plain" },
  });
});
