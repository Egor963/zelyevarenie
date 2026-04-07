// Правильный код для разделения рецептов на колонки
{snap.builtRecipes.length === 0 && <span style={{ color: "var(--muted)" }}>пока нет</span>}
<div style={{ display: 'flex', gap: '2rem' }}>
  {/* Left column - Player 1 built recipes */}
  <div style={{ flex: 1 }}>
    <h3 style={{ marginTop: 0, color: "var(--accent)" }}>Левый игрок</h3>
    {snap.players[0] && snap.builtRecipes.filter(b => b.ownerId === snap.players[0].id).map((b) => {
      const mine = b.ownerId === myId;
      const breakMode = spellBreakIdx !== null && canAct && mine;
      const transformMode = spellTransform !== null && canAct && mine;
      return (
        <div 
          key={b.instanceId} 
          className="built-row"
          style={{ cursor: transformMode ? 'pointer' : 'default', border: transformMode ? '2px solid var(--accent)' : 'none' }}
          onClick={() => {
            if (transformMode && spellTransform) {
              setSpellTransform({ ...spellTransform, builtInstanceId: b.instanceId });
            }
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <strong>{b.name}</strong>
              <span> {b.points} очк.</span>
              <span style={{ color: "var(--muted)" }}> ({b.ownerName})</span>
            </div>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
              <HandCardBlock
                card={b.card}
                index={-1}
                catalog={snap.recipeCatalog}
                canAct={false}
                craftHandIndex={null}
                spellSwap={null}
                spellTransform={null}
                onPlace={() => {}}
                onStartCraft={() => {}}
                onSpellTake={() => {}}
                onSpellBreak={() => {}}
                onSpellSwapStart={() => {}}
                onSpellSwapPickHand={() => {}}
                onSpellTransformStart={() => {}}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
  
  {/* Right column - Player 2 built recipes */}
  <div style={{ flex: 1 }}>
    <h3 style={{ marginTop: 0, color: "var(--accent)" }}>Правый игрок</h3>
    {snap.players[1] && snap.builtRecipes.filter(b => b.ownerId === snap.players[1].id).map((b) => {
      const mine = b.ownerId === myId;
      const breakMode = spellBreakIdx !== null && canAct && mine;
      const transformMode = spellTransform !== null && canAct && mine;
      return (
        <div 
          key={b.instanceId} 
          className="built-row"
          style={{ cursor: transformMode ? 'pointer' : 'default', border: transformMode ? '2px solid var(--accent)' : 'none' }}
          onClick={() => {
            if (transformMode && spellTransform) {
              setSpellTransform({ ...spellTransform, builtInstanceId: b.instanceId });
            }
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <strong>{b.name}</strong>
              <span> {b.points} очк.</span>
              <span style={{ color: "var(--muted)" }}> ({b.ownerName})</span>
            </div>
            <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}>
              <HandCardBlock
                card={b.card}
                index={-1}
                catalog={snap.recipeCatalog}
                canAct={false}
                craftHandIndex={null}
                spellSwap={null}
                spellTransform={null}
                onPlace={() => {}}
                onStartCraft={() => {}}
                onSpellTake={() => {}}
                onSpellBreak={() => {}}
                onSpellSwapStart={() => {}}
                onSpellSwapPickHand={() => {}}
                onSpellTransformStart={() => {}}
              />
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
