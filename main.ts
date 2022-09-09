import {
  serve,
  type ConnInfo
} from "https://deno.land/std@0.145.0/http/server.ts";

let process_age = 0;

setInterval(() => {
  process_age++
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

function get_remote_addr(conn_info: ConnInfo): string {
  let addr = conn_info.remoteAddr as Deno.NetAddr;
  return `${addr.hostname}:${addr.port}`;
}

serve((req, conn_info) => {
  let dir = Deno.cwd()
  let content = [
    `headers:\n${get_headers(req)}`,
    `env:\n${get_env()}`,
    `client_ip: ${get_remote_addr(conn_info)}`,
    `Deno.cwd: ${dir}`,
    `process_age: ${process_age}`,
  ].join("\n");

  return new Response(content, {
    headers: { "content-type": "text/plain" },
  });
});
