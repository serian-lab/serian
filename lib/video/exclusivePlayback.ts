type PlayerController = {
  pause: () => void;
};

const groups = new Map<string, Map<string, PlayerController>>();

/** Register a player in an exclusive group. Returns unregister. */
export function registerExclusivePlayer(
  group: string,
  id: string,
  controller: PlayerController,
): () => void {
  let members = groups.get(group);
  if (!members) {
    members = new Map();
    groups.set(group, members);
  }

  members.set(id, controller);

  return () => {
    const current = groups.get(group);
    if (!current) {
      return;
    }

    current.delete(id);
    if (current.size === 0) {
      groups.delete(group);
    }
  };
}

/** Pause every other player in the group so only `id` may play. */
export function claimExclusivePlayback(group: string, id: string): void {
  const members = groups.get(group);
  if (!members) {
    return;
  }

  for (const [memberId, controller] of members) {
    if (memberId !== id) {
      controller.pause();
    }
  }
}

/** Pause every player in the group (e.g. section left the viewport). */
export function pauseExclusiveGroup(group: string): void {
  const members = groups.get(group);
  if (!members) {
    return;
  }

  for (const controller of members.values()) {
    controller.pause();
  }
}
