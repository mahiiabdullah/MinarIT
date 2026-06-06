## Summary

<!-- What does this PR do? 2–3 sentences describing the change and its purpose. -->

## Type of Change

- [ ] ✨ Feature — new functionality
- [ ] 🐛 Bug fix — fixes an issue
- [ ] ♻️ Refactor — code change with no new features or bug fixes
- [ ] 📦 Chore — dependency update, config, tooling
- [ ] 📝 Docs — documentation only
- [ ] 🎨 Style — CSS / design changes (no logic change)
- [ ] ⚡ Performance — improves speed or efficiency

## Related Ticket

Closes MINAR-[number]

## Screenshots / Recordings

<!-- Required for UI changes. Delete this section if not applicable. -->
<!-- Drag and drop images here, or paste a Loom URL. -->

| Before | After |
|--------|-------|
| [screenshot] | [screenshot] |

## Testing Steps

<!-- How should the reviewer verify this works? Be specific. -->

1. Checkout this branch: `git checkout feature/MINAR-XX-description`
2. Run `npm run dev`
3. Navigate to `http://localhost:3000/[page]`
4. [specific action to test]
5. Expected result: [what should happen]

## Checklist

- [ ] `npm run type-check` passes with zero errors
- [ ] `npm run lint:check` passes with zero errors
- [ ] Tested on mobile (Chrome DevTools responsive mode)
- [ ] No `console.log` left in code (only `console.error` where necessary)
- [ ] All new components have TypeScript types (no `any`)
- [ ] All images use `next/image` with `width`, `height`, and `alt`
- [ ] New API routes validate input with Zod
- [ ] Loading, error, and empty states are handled in new components
- [ ] No secrets or API keys added to source code
