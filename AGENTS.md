<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep favorites as a dedicated view within the existing ShopProvider; reuse ProductCard so hearts, cart and quick view share the same state without duplicating the shop shell.
- Use the browser-safe isOfferProduct predicate for all offer selection; strict boolean opt-in keeps the catalog as the single source of truth.
