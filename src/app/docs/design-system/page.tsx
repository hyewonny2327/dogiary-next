export default function DesignSystem() {
  return (
    <main className="bg-background min-h-screen">
      {/* 헤더 */}
      <div className="bg-muted border-border border-b px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-heading text-5xl font-black">Dogiary Design System</h1>
            <p className="text-foreground text-xl font-medium">
              반려견과의 특별한 순간을 기록하는 따뜻한 공간을 위한 디자인 시스템 가이드
            </p>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="mx-auto max-w-4xl space-y-24 px-8 py-16">
        {/* 색상 시스템 */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-heading text-3xl font-bold">Colors</h2>
            <p className="text-foreground text-lg">
              도기어리의 따뜻하고 부드러운 색상 시스템을 소개합니다.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-heading mb-4 text-xl font-semibold">Primary Colors</h3>
                <div className="space-y-4">
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-primary h-24 p-4">
                      <div className="text-heading font-medium">Primary</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Primary</div>
                        <div className="text-foreground text-sm">주요 브랜드 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #f2d8b2
                      </code>
                    </div>
                  </div>
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-accent h-24 p-4">
                      <div className="text-background font-medium">Accent</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Accent</div>
                        <div className="text-foreground text-sm">강조 및 상호작용 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #c4a77f
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-heading mb-4 text-xl font-semibold">Interface Colors</h3>
                <div className="space-y-4">
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-background h-24 p-4">
                      <div className="text-heading font-medium">Background</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Background</div>
                        <div className="text-foreground text-sm">기본 배경 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #fff8e6
                      </code>
                    </div>
                  </div>
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-muted h-24 p-4">
                      <div className="text-heading font-medium">Muted</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Muted</div>
                        <div className="text-foreground text-sm">흐린 배경 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #fdf1da
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-heading mb-4 text-xl font-semibold">Text Colors</h3>
                <div className="space-y-4">
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-foreground h-24 p-4">
                      <div className="text-background font-medium">Foreground</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Foreground</div>
                        <div className="text-foreground text-sm">기본 텍스트 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #5f5013
                      </code>
                    </div>
                  </div>
                  <div className="border-border/50 overflow-hidden rounded-xl border">
                    <div className="bg-heading h-24 p-4">
                      <div className="text-background font-medium">Heading</div>
                    </div>
                    <div className="bg-background flex items-center justify-between p-4">
                      <div className="space-y-1">
                        <div className="text-heading font-medium">Heading</div>
                        <div className="text-foreground text-sm">제목 텍스트 색상</div>
                      </div>
                      <code className="bg-muted text-foreground rounded px-2 py-1 font-mono text-sm">
                        #2f2a0a
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 타이포그래피 */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-heading text-3xl font-bold">Typography</h2>
            <p className="text-foreground text-lg">
              Pretendard 폰트를 기반으로 한 타이포그래피 시스템입니다.
            </p>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-heading mb-6 text-xl font-semibold">Display & Heading</h3>
              <div className="bg-background divide-border border-border/50 divide-y overflow-hidden rounded-xl border">
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-heading text-5xl font-black">Display</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">5xl / Black</div>
                    <div className="text-sm">48px / 900</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-heading text-4xl font-extrabold">H1 Heading</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">4xl / Extra Bold</div>
                    <div className="text-sm">36px / 800</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-heading text-3xl font-bold">H2 Heading</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">3xl / Bold</div>
                    <div className="text-sm">30px / 700</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-heading text-2xl font-semibold">H3 Heading</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">2xl / Semibold</div>
                    <div className="text-sm">24px / 600</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-heading text-xl font-semibold">H4 Heading</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">xl / Semibold</div>
                    <div className="text-sm">20px / 600</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-heading mb-6 text-xl font-semibold">Body Text</h3>
              <div className="bg-background divide-border border-border/50 divide-y overflow-hidden rounded-xl border">
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-foreground text-lg font-medium">Large Body</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">lg / Medium</div>
                    <div className="text-sm">18px / 500</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-foreground font-normal">Body</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">base / Regular</div>
                    <div className="text-sm">16px / 400</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-foreground text-sm font-normal">Small</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">sm / Regular</div>
                    <div className="text-sm">14px / 400</div>
                  </div>
                </div>
                <div className="flex items-baseline justify-between p-8">
                  <p className="text-foreground text-xs font-normal">Caption</p>
                  <div className="text-foreground space-y-1 text-right">
                    <div className="font-medium">xs / Regular</div>
                    <div className="text-sm">12px / 400</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 버튼 */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h2 className="text-heading text-3xl font-bold">Buttons</h2>
            <p className="text-foreground text-lg">사용자 상호작용을 위한 버튼 컴포넌트입니다.</p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-heading mb-6 text-xl font-semibold">Variants</h3>
              <div className="bg-background border-border/50 space-y-8 rounded-xl border p-8">
                <div className="flex flex-wrap gap-4">
                  <button className="bg-primary hover:bg-accent text-heading rounded-lg px-6 py-2.5 font-medium transition-colors">
                    Primary Button
                  </button>
                  <button className="bg-accent hover:bg-primary text-background rounded-lg px-6 py-2.5 font-medium transition-colors">
                    Accent Button
                  </button>
                  <button className="border-border bg-background hover:bg-muted text-foreground rounded-lg border px-6 py-2.5 font-medium transition-colors">
                    Secondary Button
                  </button>
                </div>
                <div className="text-foreground space-y-2 text-sm">
                  <p>• Primary: 주요 행동을 위한 기본 버튼</p>
                  <p>• Accent: 중요한 행동을 강조하는 버튼</p>
                  <p>• Secondary: 보조 행동을 위한 버튼</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-heading mb-6 text-xl font-semibold">States</h3>
              <div className="bg-background border-border/50 rounded-xl border p-8">
                <div className="grid gap-8 sm:grid-cols-3">
                  <div className="space-y-4">
                    <div className="bg-primary text-heading rounded-lg px-6 py-2.5 font-medium">
                      Default
                    </div>
                    <div className="bg-accent text-heading rounded-lg px-6 py-2.5 font-medium">
                      Hover
                    </div>
                    <div className="bg-primary/80 text-heading rounded-lg px-6 py-2.5 font-medium">
                      Active
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-accent text-background rounded-lg px-6 py-2.5 font-medium">
                      Default
                    </div>
                    <div className="bg-primary text-background rounded-lg px-6 py-2.5 font-medium">
                      Hover
                    </div>
                    <div className="bg-accent/80 text-background rounded-lg px-6 py-2.5 font-medium">
                      Active
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="border-border bg-background text-foreground rounded-lg border px-6 py-2.5 font-medium">
                      Default
                    </div>
                    <div className="border-border bg-muted text-foreground rounded-lg border px-6 py-2.5 font-medium">
                      Hover
                    </div>
                    <div className="border-border bg-background/80 text-foreground rounded-lg border px-6 py-2.5 font-medium">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
