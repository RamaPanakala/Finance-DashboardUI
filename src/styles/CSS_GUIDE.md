/**
 * ============================================================================
 * CSS FILE ORGANIZATION GUIDE
 * ============================================================================
 * 
 * This guide explains the CSS file structure, naming conventions,
 * and how each file is organized.
 * 
 * FILE STRUCTURE:
 * src/
 *   ├─ App.css                 (Main entry point - imports all styles)
 *   └─ styles/
 *      ├─ Layout.css           (App layout, containers, utilities)
 *      ├─ Sidebar.css          (Left navigation menu)
 *      ├─ Header.css           (Top navigation bar)
 *      ├─ Dashboard.css        (Summary cards & charts)
 *      ├─ Transactions.css     (Transaction table)
 *      └─ Insights.css         (Insights panel)
 */

/**
 * ============================================================================
 * NAMING CONVENTIONS
 * ============================================================================
 * 
 * CLASS NAMING:
 * - Use kebab-case (my-class) for all CSS classes
 * - Use semantic names (.btn-primary, .text-danger)
 * - Use component-specific prefixes (.sidebar-menu, .card-header)
 * - Use BEM methodology for complex components
 * 
 * Example Structure:
 * .component-part__element--modifier
 * 
 * Modifiers:
 * - hover    : Hover state
 * - active   : Active/selected state
 * - disabled : Disabled state
 * - dark     : Dark mode variant
 * 
 * Colors:
 * - positive  : Green (#2ecc71)
 * - negative  : Red (#ff4757)
 * - cautionary: Orange (#ffa500)
 * - primary   : Purple (#667eea)
 */

/**
 * ============================================================================
 * CSS FILE BREAKDOWN
 * ============================================================================
 * 
 * 📄 App.css
 * ────────────────────────────────────────────────────────────────────────
 * Master stylesheet that imports all other CSS files.
 * Also defines component-specific styles not in other files.
 * 
 * Sections:
 * 1. @import statements (all modular CSS)
 * 2. .checklist component styles
 * 3. Dark mode overrides (.dark-mode .checklist)
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Layout.css
 * ────────────────────────────────────────────────────────────────────────
 * Main layout styles for the entire application.
 * Contains flexbox layouts, grid systems, and utility classes.
 * 
 * SECTIONS:
 * 
 * 1. GLOBAL STYLES
 *    - * {} - Reset margins and padding
 *    - body - Font family, smoothing
 *    - html, body - 100% height
 * 
 * 2. ROOT CONTAINER
 *    - #root - Flex layout, 100vh, overflow hidden
 * 
 * 3. APP STRUCTURE
 *    - .app-container - Main flex container with sidebar offset
 *    - .app-header - Header wrapper
 *    - .app-content - Scrollable content area
 *    - .content-wrapper - Two-column grid (main + right)
 * 
 * 4. GRID LAYOUTS
 *    - .main-content - Left column content
 *    - .right-sidebar - Right column widgets
 * 
 * 5. SCROLLBAR STYLING
 *    Custom scrollbar appearance for consistency
 * 
 * 6. DARK MODE SUPPORT
 *    - body.dark-mode - Dark background colors
 *    - .dark-mode .app-* - Dark mode variants
 * 
 * 7. RESPONSIVE BREAKPOINTS
 *    @media (max-width: 1200px) - Tablet layout
 *    @media (max-width: 768px)  - Mobile layout
 *    @media (max-width: 480px)  - Small mobile layout
 * 
 * 8. UTILITY CLASSES
 *    .hidden, .visible - Display toggles
 *    .flex-* - Flexbox helpers
 *    .gap-* - Gap utilities (1-4 = 4,8,16,24px)
 *    .font-* - Font size utilities
 *    .text-* - Text color utilities
 *    .mt-*, .mb-*, .p-* - Spacing utilities
 *    .rounded-* - Border radius utilities
 * 
 * 9. ANIMATIONS
 *    @keyframes fadeIn - Fade in animation
 *    @keyframes slideInLeft - Slide from left
 *    @keyframes slideInUp - Slide from bottom
 *    Animation utility classes (.fade-in, etc.)
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Sidebar.css
 * ────────────────────────────────────────────────────────────────────────
 * Styles for the left navigation sidebar.
 * Fixed 250px width, gradient background, menu items.
 * 
 * SECTIONS:
 * 
 * 1. SIDEBAR CONTAINER
 *    - .sidebar - Fixed position, 250px, height 100vh
 *    - Box shadow and gradient background
 * 
 * 2. HEADER SECTION
 *    - .sidebar-header - Logo + title area
 *    - .sidebar-logo - Purple gradient circle
 *    - .sidebar-title - Brand name and tagline
 * 
 * 3. NAVIGATION MENU
 *    - .sidebar-menu - List container
 *    - .sidebar-menu-item - Individual menu items
 *    - .sidebar-menu-item:hover - Hover state
 *    - .sidebar-menu-item.active - Active state with gradient
 *    - .sidebar-menu-icon - Icon container
 * 
 * 4. PREMIUM SECTION
 *    - .sidebar-footer - Footer container
 *    - .premium-banner - Gradient banner
 *    - .premium-button - Upgrade button
 * 
 * 5. HELP & SUPPORT
 *    - .sidebar-help - Help link with icon
 *    - Hover state and cursor pointer
 * 
 * 6. RESPONSIVE DESIGN
 *    @media (max-width: 1024px)
 *      - Sidebar collapses to 80px
 *      - Hide text labels
 *      - Icons only display
 * 
 *    @media (max-width: 768px)
 *      - Sidebar becomes horizontal
 *      - Position at top, flex direction row
 *      - Full width
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Header.css
 * ────────────────────────────────────────────────────────────────────────
 * Styles for the top navigation header bar.
 * Contains title, role selector, dark mode toggle, user profile.
 * 
 * SECTIONS:
 * 
 * 1. HEADER CONTAINER
 *    - .header - Flex layout, white background
 *    - Flexbox with space-between alignment
 * 
 * 2. LEFT SECTION
 *    - .header-left - Title and subtitle
 *    - .header-title - Main page title (24px, bold)
 *    - .header-subtitle - Secondary text with icon
 * 
 * 3. CENTER SECTION
 *    - .header-center - Filter controls
 *    - Takes up middle space
 * 
 * 4. ICON BUTTONS
 *    - .icon-button - Reusable button style
 *    - 40x40px, border, hover effect
 *    - .icon-button.active - Highlighted state (purple)
 * 
 * 5. NOTIFICATION BADGE
 *    - .notification-badge - Relative positioned wrapper
 *    - .badge - Absolute positioned red circle
 *    - Number display (top right)
 * 
 * 6. ROLE SELECTOR
 *    - .role-selector - Flex dropdown
 *    - Select element inside
 *    - Hover and focus states
 * 
 * 7. USER PROFILE
 *    - .user-profile - Profile section
 *    - .user-avatar - Circular avatar (36x36px)
 *    - .user-info - Name and email
 *    - .user-dropdown - Dropdown chevron
 * 
 * 8. RESPONSIVE DESIGN
 *    @media (max-width: 768px)
 *      - Flex wrap to 2 rows
 *      - Adjust order and sizing
 *      - Hide email in user-info
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Dashboard.css
 * ────────────────────────────────────────────────────────────────────────
 * Styles for dashboard overview with summary cards and charts.
 * 
 * SECTIONS:
 * 
 * 1. DASHBOARD CONTAINER
 *    - .dashboard-container - Max width, padding
 * 
 * 2. SUMMARY CARDS GRID
 *    - .summary-cards - Auto-fit grid, 3 cards per row
 *    - .summary-card - White card with shadow, padding
 *    - Hover: Lift effect and increased shadow
 * 
 * 3. CARD STRUCTURE
 *    - .card-header - Flex between title and icon
 *    - .card-title - Small caps text
 *    - .card-icon - Colored circles
 *      - .card-icon.blue - Purple background
 *      - .card-icon.green - Green background
 *      - .card-icon.red - Red background
 *    - .card-amount - Large amount display (28px)
 * 
 * 4. CARD FOOTER
 *    - .card-footer - Flex layout
 *    - .change-indicator - Trend with arrow
 *      - .change-indicator.positive - Green
 *      - .change-indicator.negative - Red
 *    - .change-percentage - Light text
 * 
 * 5. CHARTS SECTION
 *    - .charts-grid - Two column grid
 *    - .chart-card - White card container
 *    - .chart-header - Title + dropdown
 *    - .chart-title - Large title (16px, bold)
 *    - .chart-dropdown - Filter select
 *    - .chart-container - Height 300px, flex center
 * 
 * 6. CHART LEGEND
 *    - .chart-legend - 2-column grid
 *    - .legend-item - Color dot + label + value
 *    - .legend-color - Colored square
 * 
 * 7. DARK MODE
 *    - .dark-mode .summary-card - Dark background
 *    - .dark-mode .chart-card - Dark background
 * 
 * 8. RESPONSIVE
 *    @media (max-width: 1024px) - 2 cards per row
 *    @media (max-width: 768px) - 1 card per row
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Transactions.css
 * ────────────────────────────────────────────────────────────────────────
 * Styles for transaction list with table, filters, and search.
 * 
 * SECTIONS:
 * 
 * 1. CONTAINER
 *    - .transactions-container - White card, padding, shadow
 * 
 * 2. HEADER & CONTROLS
 *    - .transactions-header - Flex layout
 *    - .transactions-title - Heading
 *    - .transactions-controls - Flex controls row
 * 
 * 3. INPUTS
 *    - .search-input - Search field
 *    - .filter-select - Dropdown filter
 *    - Both have focus states with blue outline
 * 
 * 4. ADD BUTTON
 *    - .btn-add-transaction - Purple gradient button
 *    - Hover: Lift effect with shadow
 * 
 * 5. TABLE STRUCTURE
 *    - .transactions-table - Full width, border collapse
 *    - thead - Gray background
 *    - th - Uppercase labels
 *    - tbody tr - Hover highlight
 *    - td - Standard padding
 * 
 * 6. CELL CONTENT
 *    - .transaction-date - Bold text
 *    - .transaction-description - Dialog label
 *    - .transaction-amount - Colored (green/red)
 * 
 * 7. BADGES
 *    - .category-badge - Colored backgrounds
 *      - .food, .shopping, .transport, etc.
 *    - .type-badge - Income/Expense
 *      - .income - Green
 *      - .expense - Red
 * 
 * 8. ACTIONS
 *    - .transaction-actions - Action buttons
 *    - .action-btn - Edit/Delete buttons
 *    - .action-btn.edit - Blue on hover
 *    - .action-btn.delete - Red on hover
 * 
 * 9. PAGINATION
 *    - .pagination - Controls at bottom
 *    - .pagination-btn - Page numbers
 *    - .pagination-btn.active - Highlighted
 * 
 * 10. EMPTY STATE
 *     - .empty-state - Centered text with icon
 * 
 * 11. DARK MODE
 *     - All elements have dark mode variants
 * 
 * 12. RESPONSIVE
 *     - Table font shrinks
 *     - Controls stack vertically
 *     - Actions become icon-only on small screens
 */

/**
 * ════════════════════════════════════════════════════════════════════════
 * 
 * 📄 styles/Insights.css
 * ────────────────────────────────────────────────────────────────────────
 * Styles for insights panel with analytics cards.
 * 
 * SECTIONS:
 * 
 * 1. CONTAINER
 *    - .insights-container - White card with shadow
 * 
 * 2. HEADER
 *    - .insights-header - Flex title + filter
 *    - .insights-title - Heading
 *    - .insights-filter - Dropdown
 * 
 * 3. INSIGHT CARDS
 *    - .insight-card - Card with left border (4px)
 *    - .insight-card.positive - Green left border
 *    - .insight-card.cautionary - Orange left border
 *    - .insight-card.negative - Red left border
 *    - Hover: Slide right effect
 * 
 * 4. CARD CONTENT
 *    - .insight-icon - Colored circle (40x40)
 *      - Icon varies by type
 *    - .insight-content - Text content
 *    - .insight-title - Small header
 *    - .insight-description - Main text
 *    - .insight-highlight - Colored text
 * 
 * 5. SPENDING SECTION
 *    - .spending-section - Separated section
 *    - .spending-title - Category heading
 * 
 * 6. SPENDING LIST
 *    - .spending-list - List items
 *    - .spending-item - Individual items
 *    - .spending-category - Icon + name (flex)
 *    - .spending-icon - Colored icon (28x28)
 *    - .spending-amount - Money value
 *    - .spending-percentage - Percentage text
 * 
 * 7. CATEGORY ICONS
 *    - .spending-icon.food - Orange background
 *    - .spending-icon.shopping - Purple background
 *    - .spending-icon.transport - Blue background
 *    - etc...
 * 
 * 8. LINK
 *    - .view-all-link - Purple text, underline on hover
 * 
 * 9. DARK MODE
 *    - All elements have dark mode support
 * 
 * 10. RESPONSIVE
 *     - Card padding adjusts
 *     - Font sizes shrink
 *     - Icons stay sized
 */

/**
 * ============================================================================
 * COMMON PATTERNS & HOW TO USE
 * ============================================================================
 * 
 * CREATING A NEW CARD:
 * <div class="summary-card">
 *   <div class="card-header">
 *     <h3 class="card-title">Title</h3>
 *     <div class="card-icon blue">💳</div>
 *   </div>
 *   <div class="card-amount">$5,000</div>
 *   <div class="card-footer">
 *     <span class="change-indicator positive">↑ +10%</span>
 *   </div>
 * </div>
 * 
 * ADDING A BUTTON:
 * <button class="btn-add-transaction">Add Item</button>
 * 
 * CREATING A BADGE:
 * <span class="category-badge food">Groceries</span>
 * 
 * FLEX UTILITIES:
 * .flex-center  - Center items both ways
 * .flex-between - Space between
 * .gap-1, .gap-2, .gap-3, .gap-4 - Gaps
 * 
 * TEXT UTILITIES:
 * .text-primary - Purple color
 * .text-success - Green color
 * .text-danger - Red color
 * .text-muted - Gray color
 * 
 * SPACING:
 * .mt-1 / .mb-1 - 4px margin
 * .mt-2 / .mb-2 - 8px margin
 * .mt-3 / .mb-3 - 16px margin
 * .mt-4 / .mb-4 - 24px margin
 * .p-1 to .p-4 - Padding variants
 */

/**
 * ============================================================================
 * COLOR REFERENCE
 * ============================================================================
 * 
 * Use these hex colors consistently across all components:
 * 
 * PRIMARY: #667eea (Purple)
 *   - Use for: Primary buttons, links, accents
 *   - Gradients: #667eea to #764ba2
 * 
 * SUCCESS: #2ecc71 (Green)
 *   - Use for: Income, gains, positive trends
 * 
 * DANGER: #ff4757 (Red)
 *   - Use for: Expenses, losses, warnings, delete buttons
 * 
 * WARNING: #ffa500 (Orange)
 *   - Use for: Caution, moderate issues
 * 
 * NEUTRAL: 
 *   #1a1a1a - Headings (darkest)
 *   #666666 - Body text
 *   #999999 - Labels, subtitles
 *   #e0e0e0 - Borders
 *   #f0f0f0 - Dividers
 *   #f5f5f5 - Light hover backgrounds
 *   #f9f9f9 - Lighter backgrounds
 *   #ffffff - Pure white
 */

export default {};
