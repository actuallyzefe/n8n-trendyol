# n8n-nodes-trendyol

![Trendyol Logo](https://developers.trendyol.com/assets/img/trendyol_logo.svg)

A custom n8n node for integrating with Trendyol Marketplace API. This node enables seamless automation workflows between Trendyol and other services through n8n's visual workflow builder.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Features](#features)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Contributing](#contributing)  
[Development Setup](#development-setup)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Installation

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-trendyol`
4. Agree to the risks of using community nodes: select **I understand the risks of installing unverified code from a public source**
5. Select **Install**

After installing the node, you can use it like any other node in n8n.

## Features

This Trendyol node provides comprehensive integration with the Trendyol Marketplace API, supporting:

### **Products**

- `Get All` - Retrieve all products with pagination and filtering options
- `Get` - Retrieve specific product details by ID
- `Create` - Create new products with full product configuration
- `Update` - Modify existing product information
- `Update Price and Stock` - Update product pricing and inventory levels

### **Orders**

- `Get All` - Retrieve order information with comprehensive filtering (date ranges, status, etc.)
- `Get` - Fetch specific order details by order ID

### **Brands**

- `Get All` - List all available brands with pagination
- `Get By Name` - Search for brands by name

### **Categories**

- `Get All` - Retrieve all product categories

## Credentials

To use this node, you need to authenticate with Trendyol using your API credentials. Here's how to set it up:

### Prerequisites

1. You must have a Trendyol Partner account
2. Access to Trendyol Partner Panel for API credential generation

### Authentication Setup

1. Log in to your Trendyol Partner account at [https://partner.trendyol.com/](https://partner.trendyol.com/)
2. Click on your store name in the top-right corner
3. Select "Hesap Bilgilerim" (Account Information)
4. Navigate to the "Entegrasyon Bilgileri" (Integration Information) tab
5. Note down your:
   - **Supplier ID** (Tedarikçi ID)
   - **API Key** (API Anahtarı)
   - **API Secret** (API Gizli Anahtarı)

### Credential Configuration

When setting up the Trendyol API credentials in n8n:

- **Supplier ID**: Your Trendyol Supplier ID from the integration panel
- **API Key**: The API Key from your integration settings
- **API Secret**: The API Secret from your integration settings
- **Environment**: Choose between Production and Sandbox environments

The node uses HTTP Basic Authentication with your API Key as username and API Secret as password.

## Compatibility

- **Minimum n8n version**: 1.0.0
- **Node version**: 1.0
- **Tested with**: n8n 1.x
- **Node.js**: >=20.15

This node uses the Trendyol Marketplace API and should be compatible with all current Trendyol partner configurations.

## Usage

### Quick Start

1. Install the node using n8n's community node installation process
2. Set up your Trendyol API credentials
3. Create a new workflow and add the Trendyol node
4. Configure your desired operation (Product, Order, Brand, or Category management)

### Workflow Examples

#### Example 1: Inventory Sync from External Source

```
Webhook → Data Processing → Trendyol (Update Price and Stock) → Email Notification
```

This workflow listens for inventory updates, processes the data, updates product stock and pricing in Trendyol, and sends a confirmation email.

#### Example 2: Order Processing Automation

```
Schedule Trigger → Trendyol (Get Orders) → Filter (New Orders) → Process Orders → Send Notifications
```

This workflow runs periodically to fetch new orders from Trendyol and process them through your fulfillment system.

#### Example 3: Product Catalog Sync

```
Schedule Trigger → External API (Get Products) → Transform Data → Trendyol (Create/Update Products)
```

This workflow synchronizes your product catalog with Trendyol, creating new products or updating existing ones.

### Resource Operations

**Product Operations**: Manage your product catalog with full CRUD operations, including specialized price and inventory updates.

**Order Operations**: Access order information with comprehensive filtering by date ranges, status, and other criteria.

**Brand Operations**: Retrieve brand information for product categorization and management.

**Category Operations**: Access Trendyol's category structure for proper product classification.

### Advanced Configuration

**Pagination**: Use page and size parameters for large datasets to efficiently manage API calls and response sizes.

**Filtering**: Apply various filters like approval status, archive status, and date ranges to get precisely the data you need.

**Error Handling**: The node includes comprehensive error handling with detailed error messages for troubleshooting.

## Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the Repository**: Click the "Fork" button on GitHub to create your own copy
2. **Clone Your Fork**: `git clone https://github.com/YOUR_USERNAME/n8n-nodes-trendyol.git`
3. **Create a Branch**: `git checkout -b feature/your-feature-name`
4. **Make Your Changes**: Implement your feature or fix
5. **Test Your Changes**: Ensure everything works correctly
6. **Commit Your Changes**: `git commit -am 'Add some feature'`
7. **Push to Your Branch**: `git push origin feature/your-feature-name`
8. **Create a Pull Request**: Submit your changes for review

### Code Standards

- Follow the existing TypeScript code style
- Use meaningful variable and function names
- Add JSDoc comments for new functions
- Ensure all new code is properly typed

### Reporting Issues

Found a bug or have a feature request? Please check existing issues first, then create a new issue with:

- Clear description of the problem or request
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Your environment details (n8n version, Node.js version, etc.)

## Development Setup

### Prerequisites

- Node.js >=20.15
- n8n (for testing)
- Trendyol Partner Account with API access

### Setup Instructions

1. **Clone the Repository**

   ```
   git clone https://github.com/YOUR_USERNAME/n8n-nodes-trendyol.git
   cd n8n-nodes-trendyol
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Build the Project**

   ```
   npm run build
   ```

4. **Linting and Formatting**
   ```
   npm run lint        # Check for linting issues
   npm run lintfix     # Fix auto-fixable issues
   npm run format      # Format code with prettier
   ```

### Project Structure

```
├── credentials/           # Authentication credential definitions
│   └── TrendyolApi.credentials.ts
├── nodes/
│   └── Trendyol/
│       ├── Trendyol.node.ts    # Main node implementation
│       └── trendyol.svg        # Node icon
├── gulpfile.js          # Build configuration
├── package.json         # Project configuration
└── tsconfig.json        # TypeScript configuration
```

### Testing Your Changes

1. Build the project: `npm run build`
2. Link to n8n: Follow n8n's community node development guide
3. Test your changes in n8n workflows
4. Verify all operations work as expected with real Trendyol API

## Resources

- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/#community-nodes)
- [n8n Node Development Guide](https://docs.n8n.io/integrations/creating-nodes/)
- [Trendyol Developer Documentation](https://developers.trendyol.com/)
- [Trendyol API Authorization Guide](https://developers.trendyol.com/docs/authorization)
- [Trendyol Product Integration API](https://developers.trendyol.com/docs/marketplace/urun-entegrasyonu/api-endpointleri)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to the n8n team for creating an amazing workflow automation platform
- Thanks to Trendyol for providing a comprehensive e-commerce marketplace API
- Thanks to all contributors who help improve this node

---

**Need Help?**

- Check out the [Issues](../../issues) for common problems
- Create a new issue if you can't find a solution
- Join the [n8n community](https://community.n8n.io/) for general n8n support
- Review [Trendyol API documentation](https://developers.trendyol.com/) for API-specific questions
