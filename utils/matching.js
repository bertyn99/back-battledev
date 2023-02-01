/**
 *
 * @param {Map<string, MatchingPlayer>} mm_pool
 * @returns
 */
// ITERATE THROUGH POOL AND MATCH PLAYERS
function match_make(mm_pool) {
  if (mm_pool.size < 1) {
    return;
  }
  for (const [A, p1] of mm_pool) {
    for (const [B, p2] of mm_pool) {
      if (is_match(p1, p2)) {
        const a = mm_pool.get(A);
        const b = mm_pool.get(B);
        if (a && b) {
          do_battle({ ...a }, { ...b });
          mm_pool.delete(A);
          mm_pool.delete(B);
        }
      } else {
        const b = mm_pool.get(B);
        if (b && Date.now() - b.player.time_joined > MAX_TIME_IN_QUEUE) {
          b.socket.send(`${b.player.id}  didn't find a match.`);
          b.socket.close();
          mm_pool.delete(B);
        }
      }
    }
  }
}

/**
 * DETERMINES IF 2 PLAYERS ARE A MATCH
 * @param {MatchingPlayer} p1
 * @param {MatchingPlayer} p2
 * @return {boolean}
 */
//
function is_match(p1, p2) {
  // any condition you want here
  if (p1 !== p2) {
    return true;
  }
  return false;
}
/**
 * HANDLE MATCHING LOGIC / CLOSE SOCKETS WHEN DONE.
 * @param { MatchingPlayer} p1
 * @param { MatchingPlayer} p2
 */

async function do_battle(p1, p2) {
  p1.socket.send(`${p1.player.id} you were matched with ${p2.player.id}`);
  p2.socket.send(`${p2.player.id} you were matched with ${p1.player.id}`);
  p1.socket.close();
  p2.socket.close();
}
